import axios from "axios";

import { csrftoken } from './GetCSRFToken';

import {
    errorAlert,
    successAlert
} from '../common/useSwal';

export default function submitForm(e) {
    e.preventDefault();
    const myForm = e.target;
    const method = myForm.getAttribute('method');
    const url = myForm.getAttribute('action');
    const myFormData = new FormData(myForm);

    const inputEle = myForm.querySelectorAll("input, textarea");
    inputEle.forEach(item => {
        item.classList.remove('is-invalid');
        item.nextElementSibling.innerText = '';
    });

    axios({
        method: method,
        url: url,
        mode: 'same-origin',
        headers: {
            'accept': 'application/json',
            'X-CSRFToken': csrftoken,
            'Content-Type': 'multipart/form-data',
        },
        data: myFormData,
    }).then(res => {
        myForm.reset();
        successAlert(
            'Success',
            `Action performed successfully`,
            true,
        )
    }).catch(err => {
        const error = err.response.data;
        if (error.detail) {
            errorAlert(
                "There was error performing function. Perhaps it's because you are not signed in.",
                error.detail,
                '<p>Please <a href="../accounts/login">Login</a> to add post.</p>',
            )
        }
        else {
            Object.keys(error).forEach(function (key) {
                // getting the invalid form and adding invalid class to it
                let errorEle = document.getElementById(key);
                errorEle.classList.add('is-invalid');
                errorEle.nextElementSibling.innerText = error[key];
            });
        }
    })

}