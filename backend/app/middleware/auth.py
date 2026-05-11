"""
JWT Auth Middleware for Supabase tokens.
Validates Bearer tokens sent from the Next.js frontend.
"""
from fastapi import HTTPException, Security, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from ..config import get_settings

security = HTTPBearer(auto_error=False)

MOCK_USER_ID = "mock-user-1"


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(security),
) -> str:
    """
    Validate Supabase JWT and return user_id.
    In development with placeholder keys, returns a mock user.
    """
    settings = get_settings()

    if not credentials:
        if settings.environment == "development":
            return MOCK_USER_ID
        raise HTTPException(status_code=401, detail="Authorization header missing")

    token = credentials.credentials

    if settings.supabase_jwt_secret == "placeholder-jwt-secret":
        return MOCK_USER_ID

    try:
        payload = jwt.decode(
            token,
            settings.supabase_jwt_secret,
            algorithms=["HS256"],
            options={"verify_aud": False},
        )
        user_id: str = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
