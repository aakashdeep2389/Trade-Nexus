from pydantic_settings import BaseSettings
from functools import lru_cache
import os


class Settings(BaseSettings):
    supabase_url: str = os.getenv("SUPABASE_URL", "https://placeholder.supabase.co")
    supabase_service_role_key: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "placeholder")
    supabase_jwt_secret: str = os.getenv("SUPABASE_JWT_SECRET", "placeholder-jwt-secret")
    upstox_api_key: str = os.getenv("UPSTOX_API_KEY", "")
    upstox_api_secret: str = os.getenv("UPSTOX_API_SECRET", "")
    environment: str = os.getenv("ENVIRONMENT", "development")

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
