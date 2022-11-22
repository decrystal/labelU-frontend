import React, { useState  } from 'react';
import currentStyles from './index.module.scss';
import commonStyles from '../../utils/common/common.module.scss';
import { IdcardOutlined, LockOutlined } from '@ant-design/icons';
import {Input} from "antd";
import { Link } from 'react-router-dom'
import CommonController from "../../utils/common/common";
import { login as loginService } from '../../services/general';
import { useNavigate } from 'react-router-dom';
const Login = (props : any)=>{
    const { turnToSignUp, turnToTaskList } = props;
    const [checkMessage, setCheckMessage] = useState<any>({});
    const [ email, setEmail ] = useState<any>(null);
    const [ password, setPassword ] = useState<any>(null);
    const navigate = useNavigate();
    const changeEmail = (event:any)=>{
        let target = event.target.value;
        if(target !== undefined){
            target = target.trim();
            setEmail( target );
        }
    }
    const changePassword = (event : any)=>{
        let target = event.target.value;
        if(target !== undefined){
            target = target.trim();
            setPassword( target );
        }
    }
    const loginController = async function (){
        try{
            let hasUndefined = CommonController.checkObjectHasUndefined({
                username : email,
                password
            });
            if (hasUndefined.tag) {
                CommonController.notificationErrorMessage({msg : hasUndefined.key}, 5);
                return;
            }
            let checkUsername = CommonController.checkEmail(undefined, email);
            if(!checkUsername){
                return;
            }
            let checkPassword = CommonController.checkPassword(undefined, password);
            if(!checkPassword){
                return;
            }
            let res = await loginService({
                username : email,
                password
            });
            if (res.status !== 200) {
                CommonController.notificationErrorMessage(res.data,5);
                return;
            }
            let token = res.data.data.token;
            localStorage.setItem('token', token);
            navigate( turnToTaskList );
        }catch(error){
            CommonController.notificationErrorMessage(error, 1);
        }


    }
    return (<div className = { currentStyles.outerFrame } >
        <div className = {currentStyles.title} >登录</div>
        <div className = {currentStyles.email_m} >
            <Input
            placeholder = '邮箱'
            onChange = {changeEmail}
            prefix = {
                <IdcardOutlined/>
            }
            className = {'email'}
            onBlur = {CommonController.debounce(CommonController.checkEmail, 500)}
            // onPressEnter = {CommonController.debounce(CommonController.checkEmail, 1000)}
            />
            <div className = {commonStyles.loginAndSignUpNotice}>
                { checkMessage.email }
            </div>
        </div>

        <div className = {currentStyles.email_m} >
            <Input.Password
                placeholder = '密码'
                onChange = { changePassword }
                prefix = {
                    <LockOutlined/>
                }
                visibilityToggle = {false}
                onBlur = {CommonController.debounce(CommonController.checkPassword, 500)}
            />
            <div className = {commonStyles.loginAndSignUpNotice}>
                { checkMessage.password }
            </div>
        </div>

        <div className = { currentStyles.loginButton }
        onClick = {CommonController.debounce(loginController, 500)}
        >登录</div>
        <div className = { currentStyles.signUpButton }
        >
            <Link to = {turnToSignUp}>注册</Link></div>
    </div>)
}
export default Login;