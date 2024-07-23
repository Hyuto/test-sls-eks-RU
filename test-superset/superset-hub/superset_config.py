import os

FEATURE_FLAGS = {
    "ENABLE_TEMPLATE_PROCESSING": True,
    "EMBEDDED_SUPERSET": True,  # requirement
}
HTTP_HEADERS = {"X-Frame-Options": "ALLOWALL"}

ENABLE_PROXY_FIX = True
SECRET_KEY = os.environ["SUPERSET_SECRET_KEY"]
