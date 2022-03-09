import { navigate } from "@reach/router"
import axios from 'axios';
import { useContext } from "react";
import SharedContext from "./context-store";


let backendUrl = "https://veggyline.com/api";
// let backendUrl = "https://64.225.108.184:8080";
// let backendUrl = "http://192.0.0.1:8080";
let loginUrl = backendUrl + "/login";
let logoutUrl = backendUrl + "/logout";


export function login(user, pass) {
    return axios({
        method: 'post',
        url: loginUrl,
        data: {username: user, password: pass}
    });
}

export function logout() {
    return axios({
        method: 'post',
        url: logoutUrl,
        data: {token: sessionStorage.getItem('token')}
    });
}

export function httpget(url, params = {}) {
    return axios({
        method: 'get',
        url: backendUrl + url,
        params: params,
        headers: {authorization: getCookie('x-auth-token')}
    });
}

export function httppost(url, body = {}, params = {}) {
    return axios({
        method: 'post',
        url: backendUrl + url,
        params: params,
        headers: {authorization: getCookie('x-auth-token')},
        data: body,
    });
}

export function checkSession() {
    if (!getCookie('x-auth-token')) {
        console.log('nqma kuki')
        let user = localStorage.getItem('username');
        let pass = localStorage.getItem('password');
        if (user && pass) {
            console.log('i tuk')
            login(user, pass, false)
              .then(res=> {console.log(res); handleSuccessLogin(user, pass, res.data.token, res.data.role, false); return true;})
              .catch(error => {console.log(error); return false;})
        } else {
            console.log('i taaam')
            return false;
        }
    }
    return true;
}

export function handleSuccessLogin(user, pass, token, role, remember) {
    if (remember) {
        localStorage.setItem('username', user);
        localStorage.setItem('password', pass);
        localStorage.setItem('role', role);
    } else {
        sessionStorage.setItem('username', user);
        sessionStorage.setItem('role', role);
    }
    setCookie('x-auth-token', token, 0.5);
    navigate(`/home`);
}

export function getUserAndRole() {
    let user = localStorage.getItem('username');
    let pass = localStorage.getItem('password');
    let role = localStorage.getItem('role');
    if (user && pass && role) {
        return {user: user, role: role};
    } else {
        let user = sessionStorage.getItem('username');
        let role = sessionStorage.getItem('role');
        if (user && role) {
            return {user: user, role: role};
        }
        return null;
    }
}

export function isLoginIn() {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('role')) {
        return true;
    }
    return false;
}

export function handleLogout() {
    deleteCookie('x-auth-token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    localStorage.removeItem('password');
    localStorage.removeItem('password');
    navigate(`/login`);
}


export function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

export function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
}

export function deleteCookie(name) { setCookie(name, '', -1); }

export function updateQueryParam(param, value, append) {
    let currentUrlParams = new URLSearchParams(window.location.search);
    if (append) {
        let paramForAppend = new URLSearchParams(window.location.search).get(param);
        let newParamValue = paramForAppend + ',' + value;
        currentUrlParams.set(param, newParamValue);
    } else {
        currentUrlParams.set(param, value);
    }

    window.history.pushState({}, '', window.location.pathname + "?" + currentUrlParams.toString());
}

// export default class BackendService {
//     backendUrl: string = "http://192.168.1.14:3000";
//     loginUrl: string = "http://192.168.1.14:3000/login";
//     logoutUrl: string = "http://192.168.1.14:3000/logout";

//     constructor() {
//     }

//     login(user: string, pass: string, remember: boolean) {
//         return axios({
//             method: 'post',
//             url: this.loginUrl,
//             data: {username: user, password: pass}
//         });
//         // .then(res => {console.log(res); this.handleSuccessLogin(user, pass, res.data, remember);})
//         // .catch(error => {console.log(error); return error;});
//     }

//     logout() {
//         axios({
//             method: 'post',
//             url: this.logoutUrl,
//             data: {token: sessionStorage.getItem('token')}
//         })
//         .then(res => {console.log(res); this.handleLogout();})
//         .catch(error => {console.log(error); return error;});
//     }

//     get(url: string, body?: any) {
//         return axios({
//             method: 'get',
//             url: this.backendUrl + url,
//             headers: {'X-AUTH-TOKEN': this.getCookie('x-auth-token')},
//             data: body
//         });
//     }

//     post(url: string, body?: any) {
//         return axios({
//             method: 'post',
//             url: this.backendUrl + url,
//             headers: {'X-AUTH-TOKEN': this.getCookie('x-auth-token')},
//             data: body,
//         });
//     }

//     checkSession() {
//         // return "mitko";
//         if (!this.getCookie('x-auth-token')) {
//             console.log('nqma kuki')
//             let user = localStorage.getItem('username');
//             let pass = localStorage.getItem('password');
//             if (user && pass) {
//                 console.log('i tuk')
//                 this.login(user, pass, false)
//                   .then(res=> {console.log(res); this.handleSuccessLogin(user?user:"", pass?pass:"", res.data, false); return res.data;})
//                   .catch(error => {console.log(error); return error;})
//             } else {
//                 console.log('i taaam')
//                 return null;
//             }
//         }
//     }

//     handleSuccessLogin(user: string, pass: string, token: string, remember: boolean) {
//         if (remember) {
//             localStorage.setItem('username', user);
//             localStorage.setItem('password', pass);
//         } else {
//             sessionStorage.setItem('username', user);
//             sessionStorage.setItem('password', pass);
//         }
//         this.setCookie('x-auth-token', token, 0.5);
//         navigate(`/home`);
//     }

//     handleLogout() {
//         this.deleteCookie('x-auth-token');
//         sessionStorage.removeItem('username');
//         sessionStorage.removeItem('password');
//         navigate(`/login`);
//     }

//     handleError(msg: string) {
        
//     }


//     getCookie(name: string) {
//         var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
//         return v ? v[2] : null;
//     }
    
//     setCookie(name: string, value: string, days: number) {
//         var d = new Date;
//         d.setTime(d.getTime() + 24*60*60*1000*days);
//         document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
//     }
    
//     deleteCookie(name: string) { this.setCookie(name, '', -1); }


//     // checkForStoredBasket() {
//     //     let val: any;
//     //     if (val = localStorage.getItem("basketList")) {
//     //       console.log('TUK')
//     //       let currVal: Array<Product> = JSON.parse(val);
//     //       this.basketList.next(currVal);
//     //       this.basketListCount.next(currVal.length);
//     //       this.infoMessage.next("We stored your previous items. Please check basket! :)");
//     //       this.calculateTotalAmount();
//     //       return true;
//     //     }
//     //     return false;
//     //   }
    
//     //   setCartItem(value: Product) {
//     //     let key = "basketList";
//     //     let val: any;
//     //     let isPresent = false;
//     //     if (val = localStorage.getItem(key)) {
//     //       console.log('TUK')
//     //       let currVal: Array<Product> = JSON.parse(val);
//     //       console.log(val);
    
//     //       currVal.filter(f => {
//     //         if (f.id == value.id) {
//     //           f.orderAmount = +f.orderAmount + +value.orderAmount;
//     //           isPresent = true;
//     //         }
//     //       });
//     //       if (!isPresent) {
//     //         currVal.push(value);
//     //         this.basketListCount.next(this.basketListCount.value + 1);
//     //       }
//     //       localStorage.setItem(key, JSON.stringify(currVal));
//     //       this.basketList.next(currVal);
//     //     } else {
//     //       console.log('TAM');
    
//     //       let newFish: Array<Product> = new Array<Product>();
//     //       newFish.push(value);
//     //       this.basketList.next(newFish);
//     //       localStorage.setItem(key, JSON.stringify(newFish));
//     //       this.basketListCount.next(1);
//     //     }
//     //     this.calculateTotalAmount();
//     //     console.log(this.basketList.value);
//     //   }
    
//     //   getCartItems() {
//     //     return JSON.parse(localStorage.getItem("basketList"));
//     //   }
    
//     //   removeCartItem(id: number) {
//     //     let l = this.getCartItems().filter((r: Fish) => { return r.id != id; });
//     //     localStorage.setItem("basketList", l);
//     //     this.basketListCount.next(this.basketListCount.value - 1);
//     //   }
    
//     //   clearCart() {
//     //     localStorage.removeItem("basketList");
//     //     this.basketList.next(new Array<Product>());
//     //     this.basketListCount.next(0);
//     //   }
// }