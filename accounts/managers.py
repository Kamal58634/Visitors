from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self,phone_number,email,full_name,password=None):
        if not email:
            raise ValueError("user must be have email")
        if not phone_number:
            raise ValueError("user must be have email")
        if not full_name:
            raise ValueError("user must be have email")
        # user1=User(phone_number=phone_number,full_name=full_name,
        #                 email=self.normalize_email(email))
        # user1.set_password(password)
        # user1.save(using=self._db)
        user=self.model(phone_number=phone_number,full_name=full_name,
                        email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,phone_number,email,full_name,password=None):
        user=self.create_user(phone_number,email,full_name,password)
        user.is_admin=True
        user.save(using=self._db)
        return user