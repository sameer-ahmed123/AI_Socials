from .models import User
from firebase_admin import auth


def verify_firebase_token(id_token):
    """
    Verify a Firebase ID token.

    Returns the decoded Firebase user.
    """

    return auth.verify_id_token(id_token)


def get_token_from_request(request):
    """
    Extracts the Firebase Bearer token from the Authorization header.
    """

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return None

    if not auth_header.startswith("Bearer "):
        return None

    return auth_header.split(" ")[1]


def get_current_user(request):
    """
    Returns the authenticated Django user
    or None if authentication fails.
    """

    token = get_token_from_request(request)

    if token is None:
        return None

    try:
        decoded = verify_firebase_token(token)

    except Exception:
        return None

    firebase_uid = decoded["uid"]

    try:
        return User.objects.get(firebase_uid=firebase_uid)

    except User.DoesNotExist:
        return None
