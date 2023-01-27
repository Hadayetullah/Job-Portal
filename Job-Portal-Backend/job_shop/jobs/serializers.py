from rest_framework.serializers import ModelSerializer

from jobs.models import UserAuth, PersonalInfo


class UserAuthSerializer(ModelSerializer):
    class Meta:
        model = UserAuth
        fields = (
            "id",
            "email",
            "name",
            "phone",
            "dob",
            "gender",
            "password",
        )

        extra_kwargs = {
            "email": {"write_only":True},
            "name": {"write_only":True},
            "phone": {"write_only":True},
            "dob": {"write_only":True},
            "gender": {"write_only":True},
            "password":{
                "write_only":True, 
                "style":{
                    "input_type":"password",
                }
            }
        }

    def create(self, validated_data):
        user = UserAuth.objects.create_user(
            email=validated_data["email"],
            name=validated_data["name"],
            phone=validated_data["phone"],
            dob=validated_data["dob"],
            gender=validated_data["gender"],
            password=validated_data["password"],
        )

        return user



class PersonalInfoSerializer(ModelSerializer):
    class Meta:
        model = PersonalInfo
        fields = "__all__"