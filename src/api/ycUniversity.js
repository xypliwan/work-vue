import axios from '@/utils/axios'
//易仓大学

//获取  视角状态 ，面向客户  基础数据
<<<<<<< HEAD
export function getKnowledgeStatusData() {
  return axios({
    url: `/common/get-knowledge-status-data`,
    method: 'get'
  })
}

//易仓大学视角基础数据
export function getEyesight() {
  return axios({
    url: `/common/get-eyesight`,
    method: 'get'
  })
}

//视角管理-添加视觉
export function addEyesight(data = {}) {
  return axios({
    url: `/eyesight/add`,
    method: 'post',
    data
  })
}

//视角管理-获取列表
export function getEyesightList(data = {}) {
  return axios({
    url: `/eyesight/get-list`,
    method: 'get',
    params: data
  })
}

//视觉管理-更新视觉
export function updateEyesight(data = {}) {
  return axios({
    url: `/eyesight/update`,
    method: 'post',
    data
  })
}

//视角管理-删除视角
export function deleteEyesight(data = {}) {
  return axios({
    url: `/eyesight/del`,
    method: 'post',
    data
  })
}

//知识板块-添加一级板块
export function addFirstModel(data = {}) {
  return axios({
    url: `/knowledge-model/add-first-model`,
    method: 'post',
    data
  })
}

//知识板块-获取一级板块列表
export function getFirstModelList() {
  return axios({
    url: `/knowledge-model/get-first-model-list`,
    method: 'get'
  })
}

//知识模块-更新一级模块
export function updateFirstModel(data = {}) {
  return axios({
    url: `/knowledge-model/update-first-model`,
    method: 'post',
    data
  })
}

//知识模块-删除一级模块
export function deleteFirstModel(data = {}) {
  return axios({
    url: `/knowledge-model/del-first-model`,
    method: 'post',
    data
  })
}

//知识模块-添加二级模块
export function addSecondModel(data = {}) {
  return axios({
    url: `/knowledge-model/add-second-model`,
    method: 'post',
    data
  })
}

//知识模块-获取二级模块列表
export function getSecondModelList(data = {}) {
  return axios({
    url: `/knowledge-model/get-second-model`,
    method: 'get',
    params: data
  })
}

//知识模块-更新二级模块
export function updateSecondModel(data = {}) {
  return axios({
    url: `/knowledge-model/update-second-model`,
    method: 'post',
    data
  })
}

//知识模块-删除二级模块
export function delSecondModel(data = {}) {
  return axios({
    url: `/knowledge-model/del-second-model`,
    method: 'post',
    data
  })
}

//添加知识
export function addKnowledge(data = {}) {
  return axios({
    url: `/knowledge/add`,
    method: 'post',
    data
  })
}

//获取知识列表
export function getKnowledgeList(data = {}) {
  return axios({
    url: `/knowledge/get-list`,
    method: 'get',
    params: data
  })
}

//获取知识列表
export function delKnowledge(data = {}) {
  return axios({
    url: `/knowledge/del`,
    method: 'post',
    data
  })
}

//获取知识详情
export function getKnowledgeDetailNoExtend(data = {}) {
  return axios({
    url: `/knowledge/get-knowledge-detail`,
    method: 'get',
    params: data
  })
}

//获取知识详情  待扩展
export function getKnowledgeDetail(data = {}) {
  return axios({
    url: `/knowledge/get-knowledge-extend`,
    method: 'get',
    params: data
  })
}

//更新知识
export function updateKnowledgeDetail(data = {}) {
  return axios({
    url: `/knowledge/update`,
    method: 'POST',
    data
  })
}

//最近浏览---热门帮助
export function getHotHelpList(data = {}) {
  return axios({
    url: `/knowledge/hot-click`,
    method: 'get',
    params: data
  })
}

//最近浏览---浏览记录
export function getHistoryLog(data = {}) {
  return axios({
    url: `/knowledge/get-history-log`,
    method: 'get',
    params: data
  })
}

//知识详情---点赞/踩
export function addEvaluateKnowledge(data = {}) {
  return axios({
    url: `/knowledge/add-evaluate`,
    method: 'post',
    data
  })
}

//获取关键词搜索列表
export function getSearchList(data = {}) {
  return axios({
    url: `/knowledge/get-search`,
    method: 'get',
    params: data
  })
}

//获取标签
export function getTagList(data = {}) {
  return axios({
    url: `/knowledge/list-tag`,
    method: 'get',
    params: data
  })
}

//获取页面路径菜单
export function getPagePathList(data = {}) {
  return axios({
    url: `/knowledge/menu-list`,
    method: 'get',
    params: data
  })
}

//搜索文章通过关键字
export function searchByKeyword(data = {}) {
  return axios({
    url: `/knowledge/search-by-keyword`,
    method: 'get',
    params: data
  })
}

//添加标签
export function addTag(data = {}) {
  return axios({
    url: `/knowledge/add-tag`,
    method: 'post',
    data
  })
}
=======
export function getKnowledgeStatusData(data = {}) {
    return axios({
        url: `/common/get-knowledge-status-data`,
        method: "get",
    })
};

//易仓大学视角基础数据
export function getEyesight(data = {}) {
    return axios({
        url: `/common/get-eyesight`,
        method: "get",
    })
};

//视角管理-添加视觉
export function addEyesight(data = {}) {
    return axios({
        url: `/eyesight/add`,
        method: "post",
        data
    })
};

//视角管理-获取列表
export function getEyesightList(data = {}) {
    return axios({
        url: `/eyesight/get-list`,
        method: "get",
        params: data
    })
};


//视觉管理-更新视觉
export function updateEyesight(data = {}) {
    return axios({
        url: `/eyesight/update`,
        method: "post",
        data
    })
};

//视角管理-删除视角
export function deleteEyesight(data = {}) {
    return axios({
        url: `/eyesight/del`,
        method: "post",
        data
    })
};

//知识板块-添加一级板块
export function addFirstModel(data = {}) {
    return axios({
        url: `/knowledge-model/add-first-model`,
        method: "post",
        data
    })
};


//知识板块-获取一级板块列表
export function getFirstModelList(data = {}) {
    return axios({
        url: `/knowledge-model/get-first-model-list`,
        method: "get"
    })
};

//知识模块-更新一级模块
export function updateFirstModel(data = {}) {
    return axios({
        url: `/knowledge-model/update-first-model`,
        method: "post",
        data
    })
};


//知识模块-删除一级模块
export function deleteFirstModel(data = {}) {
    return axios({
        url: `/knowledge-model/del-first-model`,
        method: "post",
        data
    })
};

//知识模块-添加二级模块
export function addSecondModel(data = {}) {
    return axios({
        url: `/knowledge-model/add-second-model`,
        method: "post",
        data
    })
};


//知识模块-获取二级模块列表
export function getSecondModelList(data = {}) {
    return axios({
        url: `/knowledge-model/get-second-model`,
        method: "get",
        params: data
    })
};

//知识模块-更新二级模块
export function updateSecondModel(data = {}) {
    return axios({
        url: `/knowledge-model/update-second-model`,
        method: "post",
        data
    })
};


//知识模块-删除二级模块
export function delSecondModel(data = {}) {
    return axios({
        url: `/knowledge-model/del-second-model`,
        method: "post",
        data
    })
};


//添加知识
export function addKnowledge(data = {}) {
    return axios({
        url: `/knowledge/add`,
        method: "post",
        data
    })
};

//获取知识列表
export function getKnowledgeList(data = {}) {
    return axios({
        url: `/knowledge/get-list`,
        method: "get",
        params: data
    })
};


//获取知识列表
export function delKnowledge(data = {}) {
    return axios({
        url: `/knowledge/del`,
        method: "post",
        data
    })
};


//获取知识详情
export function getKnowledgeDetail(data = {}) {
    return axios({
        url: `/knowledge/get-knowledge-detail`,
        method: "get",
        params: data
    })
};


//更新知识
export function updateKnowledgeDetail(data = {}) {
    return axios({
        url: `/knowledge/update`,
        method: "POST",
        data
    })
};


//最近浏览---热门帮助
export function getHotHelpList(data = {}) {
    return axios({
        url: `/knowledge/hot-click`,
        method: "get",
        params: data
    })
};

//最近浏览---浏览记录
export function getHistoryLog(data = {}) {
    return axios({
        url: `/knowledge/get-history-log`,
        method: "get",
        params: data
    })
};



//知识详情---点赞/踩
export function addEvaluateKnowledge(data = {}) {
    return axios({
        url: `/knowledge/add-evaluate`,
        method: "post",
        data
    })
};

//获取关键词搜索列表
export function getSearchList(data = {}) {
    return axios({
        url: `/knowledge/get-search`,
        method: "get",
        params: data
    })
};
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
