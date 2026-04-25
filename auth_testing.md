# Auth Testing Playbook (saved per integration playbook)

## Backend curl tests
```bash
API=$REACT_APP_BACKEND_URL
# Register
curl -c /tmp/c.txt -X POST $API/api/auth/register -H "Content-Type: application/json" -d '{"email":"new@user.com","password":"secret123","name":"New User"}'
# Login
curl -c /tmp/c.txt -X POST $API/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@brewly.app","password":"admin123"}'
# Me
curl -b /tmp/c.txt $API/api/auth/me
# Per-user metrics
curl -b /tmp/c.txt $API/api/dashboard/metrics
curl -b /tmp/c.txt $API/api/uploads
# Logout
curl -b /tmp/c.txt -X POST $API/api/auth/logout
```

## Verifications
- bcrypt hash starts with $2b$
- users.email unique index
- login_attempts.identifier index
- password_reset_tokens.expires_at TTL
- New users get seeded baseline metrics + 4 sample uploads
- /api/dashboard/metrics returns user-specific totals
