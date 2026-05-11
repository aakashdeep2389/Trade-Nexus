"""
Local authentication router for development.
Handles user login without requiring external Supabase service.
"""
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from datetime import datetime, timedelta
import jwt

router = APIRouter(prefix="/api/auth", tags=["auth"])

# Mock user database for development
MOCK_USERS = {
    "test@gmail.com": {
        "password": "test123456",
        "id": "mock-user-1",
        "email": "test@gmail.com",
    },
    "test@vgmail.com": {
        "password": "test123456",
        "id": "mock-user-2",
        "email": "test@vgmail.com",
    },
}

JWT_SECRET = "dev-secret-key-not-for-production"
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24


class LoginRequest(BaseModel):
    email: str
    password: str


class AuthResponse(BaseModel):
    access_token: str
    user: dict
    expires_in: int


def create_jwt_token(user_id: str, email: str) -> str:
    """Create a JWT token for the user."""
    payload = {
        "sub": user_id,
        "email": email,
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


@router.post("/login", response_model=AuthResponse)
async def login(credentials: LoginRequest):
    """
    Local authentication endpoint for development.
    Returns JWT token on successful login.
    """
    user = MOCK_USERS.get(credentials.email)

    if not user or user["password"] != credentials.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_jwt_token(user["id"], user["email"])

    return AuthResponse(
        access_token=access_token,
        user={"id": user["id"], "email": user["email"]},
        expires_in=JWT_EXPIRATION_HOURS * 3600,
    )


@router.post("/signup")
async def signup(credentials: LoginRequest):
    """
    Signup endpoint for development.
    Creates a new mock user.
    """
    if credentials.email in MOCK_USERS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    user_id = f"user-{len(MOCK_USERS) + 1}"
    MOCK_USERS[credentials.email] = {
        "password": credentials.password,
        "id": user_id,
        "email": credentials.email,
    }

    access_token = create_jwt_token(user_id, credentials.email)

    return AuthResponse(
        access_token=access_token,
        user={"id": user_id, "email": credentials.email},
        expires_in=JWT_EXPIRATION_HOURS * 3600,
    )
