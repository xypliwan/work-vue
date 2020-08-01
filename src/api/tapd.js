import axios from '@/utils/axios'
//tapd

<<<<<<< HEAD
//获取成员
export function getTapdUsers(data = {}) {
  return axios({
    url: `/tapd/get-users`,
    method: 'get',
    params: data
  })
}

//需求分类
export function getTapdCategorys(data = {}) {
  return axios({
    url: `/tapd/get-categorys`,
    method: 'get',
    params: data
  })
}

//获取来源
export function getTapdSource(data = {}) {
  return axios({
    url: `/tapd/get-source`,
    method: 'get',
    params: data
  })
}

//获取模块
export function getTapdModules(data = {}) {
  return axios({
    url: `/tapd/get-modules`,
    method: 'get',
    params: data
  })
}

//提交到tapd
export function addTapdStories(data = {}) {
  return axios({
    url: `/tapd/add-stories`,
    method: 'post',
    data
  })
}

//创建TAPD缺陷条件
export function getBugFilter() {
  return axios({
    url: `/tapd/get-bug-filter`,
    method: 'get'
  })
}

//创建TAPD缺陷
export function addTapdBug(data = {}) {
  return axios({
    url: `/tapd/add-bugs`,
    method: 'post',
    data
  })
}
=======

//获取成员
export function getTapdUsers(data = {}) {
    return axios({
        url: `/tapd/get-users`,
        method: "get",
        params: data
    })
};

//需求分类
export function getTapdCategorys(data = {}) {
    return axios({
        url: `/tapd/get-categorys`,
        method: "get",
        params: data
    })
};

//获取来源
export function getTapdSource(data = {}) {
    return axios({
        url: `/tapd/get-source`,
        method: "get",
        params: data
    })
};


//获取模块
export function getTapdModules(data = {}) {
    return axios({
        url: `/tapd/get-modules`,
        method: "get",
        params: data
    })
};

//提交到tapd
export function addTapdStories(data = {}) {
    return axios({
        url: `/tapd/add-stories`,
        method: "post",
        data
    })
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
