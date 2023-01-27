from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)

# Create your models here.
class UserAuthManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have email!")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save(using=self._db)
        return user


class UserAuth(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True,)
    name = models.CharField(max_length=100,  null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    dob = models.CharField(max_length=150,  null=True, blank=True)
    gender = models.CharField(max_length=30,  null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAuthManager()

    USERNAME_FIELD = "email"

    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name_plural = "Authenticated User"





# Profile image upload function
def upload_pic(instance, filename):
    return "pictures/{user}/{filename}".format(user=instance.user, filename=filename)


def upload_files(instance, filename):
    return "files/{user}/{filename}".format(user=instance.user, filename=filename)



class PersonalInfo(models.Model):
    user = models.OneToOneField(UserAuth, on_delete=models.CASCADE, related_name="personal_info")
    fullName = models.CharField(max_length=100, null=True, blank=True)
    infoDob = models.CharField(max_length=150, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    nationality = models.CharField(max_length=50, null=True, blank=True)
    nid = models.CharField(max_length=50, null=True, blank=True)
    gender = models.CharField(max_length=30, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    profilePic = models.ImageField(upload_to=upload_pic, null=True, blank=True)
    objective = models.TextField(max_length=255, null=True, blank=True)
    educationLevel = models.CharField(max_length=100, null=True, blank=True)
    degreeTitle = models.CharField(max_length=40, null=True, blank=True)
    instituteName = models.CharField(max_length=100, null=True, blank=True)
    educationSubject = models.CharField(max_length=100, null=True, blank=True)
    graduationYear = models.CharField(max_length=150, null=True, blank=True)
    duration = models.CharField(max_length=20, null=True, blank=True)
    score = models.CharField(max_length=20, null=True, blank=True)
    outOfScore = models.CharField(max_length=20, null=True, blank=True)
    organizationName = models.CharField(max_length=100, null=True, blank=True)
    departmentName = models.CharField(max_length=100, null=True, blank=True)
    positionHeld = models.CharField(max_length=100, null=True, blank=True)
    experienceFrom = models.CharField(max_length=150, null=True, blank=True)
    experienceTo = models.CharField(max_length=150, null=True, blank=True)
    experienceCheck = models.BooleanField(default=True)
    responsibility = models.TextField(null=True, blank=True)
    achievement = models.TextField(null=True, blank=True)
    vendorName = models.CharField(max_length=100, null=True, blank=True)
    certificateTopic = models.CharField(max_length=150, null=True, blank=True)
    certificateScore = models.CharField(max_length=30, null=True, blank=True)
    idNo = models.CharField(max_length=30, null=True, blank=True)
    certificateFile = models.FileField(upload_to=upload_files, null=True, blank=True)
    certificationDate = models.CharField(max_length=150, null=True, blank=True)
    expireDate = models.CharField(max_length=150, null=True, blank=True)
    certificateCheck = models.BooleanField(default=True)
    trainingSubject = models.CharField(max_length=100, null=True, blank=True)
    trainingVendorName = models.CharField(max_length=100, null=True, blank=True)
    trainingFrom = models.CharField(max_length=150, null=True, blank=True)
    trainingTo = models.CharField(max_length=150, null=True, blank=True)
    trainingFile = models.FileField(upload_to=upload_files, null=True, blank=True)
    skills = models.TextField(blank=True, null=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.email
    
    class Meta:
        verbose_name_plural = "User CV"


@receiver(post_save, sender=UserAuth)
def create_profile(sender, instance, created, **kwargs):
    if created:
        PersonalInfo.objects.create(user=instance)
        

@receiver(post_save, sender=UserAuth)
def save_profile(sender, instance, **kwargs):
    instance.personal_info.save()