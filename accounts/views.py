from django.shortcuts import render, HttpResponseRedirect, reverse
from django.contrib import messages


# local imports

from .forms import UserRegistrationForm


def user_registration(request):
    if request.method == "GET":
        form = UserRegistrationForm()
        return render(request, "accounts/user-register.html",{
            "form":form,
        })

    if request.method == "POST":
        form = UserRegistrationForm(request.POST or None)
        if form.is_valid():
            form.save()
            messages.success(request, "You account has been successfully created. Please login now.")
            return HttpResponseRedirect(reverse("accounts:login"))
        else:
            return render(request, "accounts/user-register.html",{
                "form":form,
            })
