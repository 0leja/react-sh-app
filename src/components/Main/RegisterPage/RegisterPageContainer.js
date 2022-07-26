import RegisterPage from "./RegisterPage";
import {useDispatch, useSelector} from "react-redux";
import {setEmailFieldValidThunk, setPhoneFieldValidThunk} from "../../../store/authFormReducer";
import {registerThunk} from "../../../store/authReducer";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function RegisterPageContainer() {
    const dispatch = useDispatch()

    const state = useSelector(state => {
        return {
            email: {
                ...state.authForm.register.email
            },
            phone: {
                ...state.authForm.register.phone
            },
            error: {
                ...state.authForm.register.error
            },
            isLogin: state.auth.isLogin
        }
    })

    const setEmailFieldValid = email => {
        dispatch(setEmailFieldValidThunk(email))
    }

    const setPhoneFieldValid = phone => {
        dispatch(setPhoneFieldValidThunk(phone))
    }

    const register = (email, phone, password, name, surname, aftername, group, github, role, img) => {
      dispatch(registerThunk(email, phone, password, name, surname, aftername, group, github, role, img))
    }

    return <RegisterPageRouter {...state} setEmailFieldValid={setEmailFieldValid} setPhoneFieldValid={setPhoneFieldValid} register={register} />
}

function RegisterPageRouter({isLogin, error, email, phone, register, setEmailFieldValid, setPhoneFieldValid}) {
    const navigate = useNavigate()

    useEffect(() => {
        if (isLogin) navigate('../', {replace: true})
    }, [isLogin, navigate]);


    return <RegisterPage error={error}

                         email={{...email,
                                    setEmailFieldValid: setEmailFieldValid
                         }}

                         phone={{...phone,
                                    setPhoneFieldValid: setPhoneFieldValid
                         }}

                         register={register}
    />
}