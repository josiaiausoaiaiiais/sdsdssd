"""Brewly Phase-1 backend QA — auth + per-user data + uploads + favorites."""
import os
import time
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://landing-redesign-54.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@brewly.app"
ADMIN_PASSWORD = "admin123"


def _new_email(prefix="testuser"):
    return f"TEST_{prefix}_{uuid.uuid4().hex[:8]}@brewly.app"


# -------------------- Fixtures --------------------
@pytest.fixture(scope="module")
def admin_session():
    s = requests.Session()
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=20)
    assert r.status_code == 200, f"admin login failed: {r.status_code} {r.text}"
    return s


@pytest.fixture(scope="module")
def user_a():
    s = requests.Session()
    email = _new_email("alice")
    r = s.post(f"{API}/auth/register", json={"email": email, "password": "alicepass123", "name": "Alice A"}, timeout=20)
    assert r.status_code == 200, f"register failed: {r.status_code} {r.text}"
    return {"session": s, "email": email, "data": r.json()}


@pytest.fixture(scope="module")
def user_b():
    s = requests.Session()
    email = _new_email("bob")
    r = s.post(f"{API}/auth/register", json={"email": email, "password": "bobpass123", "name": "Bob B"}, timeout=20)
    assert r.status_code == 200, f"register failed: {r.status_code} {r.text}"
    return {"session": s, "email": email, "data": r.json()}


# -------------------- Health --------------------
class TestHealth:
    def test_root(self):
        r = requests.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        assert "message" in r.json()


# -------------------- Auth --------------------
class TestAuth:
    def test_register_returns_user_and_sets_cookies(self):
        s = requests.Session()
        email = _new_email("reg")
        r = s.post(f"{API}/auth/register", json={"email": email, "password": "secret123", "name": "Reg User"}, timeout=20)
        assert r.status_code == 200
        data = r.json()
        assert data["email"] == email.lower()
        assert data["name"] == "Reg User"
        assert data["role"] == "user"
        assert "id" in data
        cookies = {c.name for c in s.cookies}
        assert "access_token" in cookies and "refresh_token" in cookies

    def test_register_duplicate_email(self, user_a):
        r = requests.post(f"{API}/auth/register",
                          json={"email": user_a["email"], "password": "x123456", "name": "dup"}, timeout=20)
        assert r.status_code == 400

    def test_login_admin_success(self):
        s = requests.Session()
        r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=20)
        assert r.status_code == 200
        d = r.json()
        assert d["email"] == ADMIN_EMAIL
        assert d["role"] == "admin"
        assert "access_token" in {c.name for c in s.cookies}

    def test_login_invalid_password(self):
        r = requests.post(f"{API}/auth/login",
                          json={"email": ADMIN_EMAIL, "password": "wrongpass"}, timeout=20)
        assert r.status_code in (401, 429)

    def test_me_without_cookie_401(self):
        r = requests.get(f"{API}/auth/me", timeout=15)
        assert r.status_code == 401

    def test_me_with_cookie_returns_user(self, admin_session):
        r = admin_session.get(f"{API}/auth/me", timeout=15)
        assert r.status_code == 200
        d = r.json()
        assert d["email"] == ADMIN_EMAIL

    def test_logout_clears_cookies(self):
        s = requests.Session()
        r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=20)
        assert r.status_code == 200
        rl = s.post(f"{API}/auth/logout", timeout=15)
        assert rl.status_code == 200
        # cookie should be cleared (Set-Cookie with empty / past expiry)
        rme = s.get(f"{API}/auth/me", timeout=15)
        assert rme.status_code == 401

    def test_brute_force_lockout(self):
        # Use a brand new account so we don't pollute admin
        s = requests.Session()
        email = _new_email("brute")
        s.post(f"{API}/auth/register", json={"email": email, "password": "rightpass1", "name": "Brute"}, timeout=20)
        last = None
        for _ in range(7):
            last = requests.post(f"{API}/auth/login", json={"email": email, "password": "WRONG_PWD"}, timeout=20)
        # After 5 failures lockout should kick in -> 429
        assert last is not None and last.status_code == 429, f"expected 429 after brute force, got {last.status_code}"


# -------------------- Per-user metrics --------------------
class TestMetrics:
    def test_metrics_requires_auth(self):
        r = requests.get(f"{API}/dashboard/metrics", timeout=15)
        assert r.status_code == 401

    def test_metrics_shape(self, admin_session):
        r = admin_session.get(f"{API}/dashboard/metrics", timeout=15)
        assert r.status_code == 200
        d = r.json()
        for k in ("earnings", "views", "new_fans", "streak_days",
                  "earnings_delta", "views_delta", "fans_delta",
                  "favorites_count", "uploads_count"):
            assert k in d, f"missing {k}"
        assert d["earnings"].startswith("$")

    def test_metrics_unique_per_user(self, user_a, user_b):
        ra = user_a["session"].get(f"{API}/dashboard/metrics", timeout=15).json()
        rb = user_b["session"].get(f"{API}/dashboard/metrics", timeout=15).json()
        # Deterministic per user_id => different users very likely produce different tuples
        sig_a = (ra["earnings"], ra["views"], ra["new_fans"], ra["streak_days"])
        sig_b = (rb["earnings"], rb["views"], rb["new_fans"], rb["streak_days"])
        assert sig_a != sig_b, f"two users got identical metrics {sig_a} == {sig_b}"


# -------------------- Uploads CRUD --------------------
class TestUploads:
    def test_seeded_four_uploads(self, user_a):
        r = user_a["session"].get(f"{API}/uploads", timeout=15)
        assert r.status_code == 200
        items = r.json()
        assert len(items) >= 4
        for it in items:
            assert "id" in it and "title" in it and "thumbnail" in it
            assert "_id" not in it

    def test_uploads_isolated_per_user(self, user_a, user_b):
        a_ids = {x["id"] for x in user_a["session"].get(f"{API}/uploads", timeout=15).json()}
        b_ids = {x["id"] for x in user_b["session"].get(f"{API}/uploads", timeout=15).json()}
        assert a_ids and b_ids
        assert a_ids.isdisjoint(b_ids), "Users see each other's uploads!"

    def test_create_upload_persists(self, user_a):
        s = user_a["session"]
        payload = {"title": "TEST_my_clip", "source": "ai", "ratio": "9:16", "duration_sec": 42}
        r = s.post(f"{API}/uploads", json=payload, timeout=15)
        assert r.status_code == 200
        created = r.json()
        assert created["title"] == "TEST_my_clip"
        new_id = created["id"]
        # GET verifies persistence
        items = s.get(f"{API}/uploads", timeout=15).json()
        assert any(x["id"] == new_id for x in items)

    def test_delete_other_users_upload_returns_404(self, user_a, user_b):
        a_id = user_a["session"].get(f"{API}/uploads", timeout=15).json()[0]["id"]
        r = user_b["session"].delete(f"{API}/uploads/{a_id}", timeout=15)
        assert r.status_code == 404

    def test_delete_own_upload(self, user_a):
        s = user_a["session"]
        # Create then delete
        c = s.post(f"{API}/uploads", json={"title": "TEST_to_delete", "source": "upload"}, timeout=15).json()
        rd = s.delete(f"{API}/uploads/{c['id']}", timeout=15)
        assert rd.status_code == 200
        items = s.get(f"{API}/uploads", timeout=15).json()
        assert all(x["id"] != c["id"] for x in items)


# -------------------- Favorites --------------------
class TestFavorites:
    def test_add_list_remove(self, user_a):
        s = user_a["session"]
        upload_id = s.get(f"{API}/uploads", timeout=15).json()[0]["id"]

        r = s.post(f"{API}/favorites", json={"upload_id": upload_id}, timeout=15)
        assert r.status_code == 200

        # idempotent
        r2 = s.post(f"{API}/favorites", json={"upload_id": upload_id}, timeout=15)
        assert r2.status_code == 200

        favs = s.get(f"{API}/favorites", timeout=15).json()
        assert any(f["id"] == upload_id for f in favs)

        rd = s.delete(f"{API}/favorites/{upload_id}", timeout=15)
        assert rd.status_code == 200
        favs2 = s.get(f"{API}/favorites", timeout=15).json()
        assert all(f["id"] != upload_id for f in favs2)


# -------------------- DB-level sanity (bcrypt + unique index) --------------------
class TestDBSanity:
    def test_bcrypt_hash_format_and_unique_index(self):
        """Connect to mongo directly to verify hash + index."""
        try:
            from pymongo import MongoClient
        except Exception:
            pytest.skip("pymongo unavailable")
        mongo_url = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
        db_name = os.environ.get("DB_NAME", "test_database")
        c = MongoClient(mongo_url, serverSelectionTimeoutMS=3000)
        db = c[db_name]
        u = db.users.find_one({"email": ADMIN_EMAIL})
        assert u is not None, "admin not seeded"
        assert u["password_hash"].startswith("$2b$"), f"bad hash format: {u['password_hash'][:6]}"
        idx = db.users.index_information()
        # email index should exist & be unique
        email_unique = any(v.get("unique") and any(k[0] == "email" for k in v["key"]) for v in idx.values())
        assert email_unique, "users.email unique index missing"
