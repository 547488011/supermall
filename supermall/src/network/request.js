import axios from 'axios'
export function request(config){
    const instance = axios.create({
        baseURL:'http://152.136.185.210:8000/api/n3',
        timeout:5000
    })
    instance.interceptors.request.use(config=>{
        // toast.loading({
        //     forbidClick: true,
        //     message: "加载中..."
        //   });
          return config
    },err=>{
        return Promise.reject(err)
    })
    instance.interceptors.response.use(res=>{
        // toast.clear();
        return res.data
    },err=>{
        return err;
    })
    return instance(config)
}