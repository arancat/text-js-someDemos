var personArr = [
    {name:'王港', src:'./src/img/3.png', des:'颈椎不好',sex:'m'},
    {name:'刘莹', src:'./src/img/5.png', des:'我是谁',sex:'f'},
    {name:'王秀莹', src:'./src/img/4.png', des:'我很好看',sex:'f'},
    {name:'刘金雷', src:'./src/img/1.png', des:'你没有见过陌生的脸',sex:'m'},
    {name:'刘飞翔', src:'./src/img/2.png', des:'瓜皮刘',sex:'m'}
  ];

  var oUl = document.getElementsByTagName('ul')[0];
  var oSearch = document.getElementsByClassName('search-box')[0];
  var oP = document.getElementsByTagName('p')[0];
//   渲染传入的arr
  function renderList(arr) {
    var str = '';
    arr.forEach(function (ele, index) {
        //   str += '<li>
        //             <img src="./src/img/1.png" alt="">
        //             <p class="username">邓哥</p>
        //             <p class="des">妻妾成群</p>
        //   </li>'//标签如何转变成字符串来实现拼接
            str += '<li>\
                        <img src=' + ele.src + ' alt="">\
                        <p class="username">' + ele.name +'</p>\
                        <p class="des">' + ele.des +'</p>\
                </li>'//详情看正则表达式的拼接有讲原理+\

      })
      oUl.innerHTML = str;
  }
//   oUl.innerText = '<li></li><li></li><li></li><li></li><li></li>';
//innerText是当做字符串生成插入到HTML中
//oUl.innerHTML = '<li></li><li></li><li></li><li></li><li></li>';
renderList(personArr);

//把零散的信息收集--->到最后去了



oSearch.oninput = function() {
    state.text = this.value;
    // var lastArr = filterText(state.text, personArr);
    // lastArr = filterSex(state.sex, lastArr);
    renderList(lastFilterFunc(personArr));
}
//indexOf有的话就输出其位置，没有的话就输出-1

//根据name来筛选数组
function filterText(text, arr) {
    return  arr.filter(function (ele, index) {
        // if(ele.name.indexOf(text) != -1) {
        //     return true;
        // }else {
        //     return false;
        // }
        //如何简化↓
        return ele.name.indexOf(text) != -1 ? true : false;
    })
}

oP.addEventListener('click', function (e) {
    if(e.target.nodeName == 'SPAN') {
        //判断是否点击的是缝隙，这里有冒泡，所以都能触发，所以判断在谁身上（事件源对象）
        document.getElementsByClassName('active')[0].className = '';
        e.target.className = 'active';
        //如何获取HTML中的属性
        state.sex = e.target.getAttribute('sex');
        //getAttribute 不是直接sex，因为sex是手动添加的特性 不是属性
        // var lastArr = filterText(state.text, personArr);
        // lastArr = filterSex(state.sex, lastArr);
        //合并筛选条件↓
        renderList(lastFilterFunc(personArr));
        //一定要在最后渲染进HTML
    }
})
//根据性别来筛选 
function filterSex(sex, arr) {
    if(sex == 'a') {
        return arr;
    }else {
        return  arr.filter(function (ele, index) {
            return ele.sex == sex;
        })
    }
}

//如何交叉 共同选择？————合并筛选条件 ——对象的形式（更方便更新迭代）
function unionFilterFunc(obj) {
    return function (arr) {
        var lastArr = arr;
        for(var prop in obj) {
            //prop -->text
            lastArr = obj[prop](state[prop], lastArr);
        }
        return lastArr;
    }
}
var lastFilterFunc = unionFilterFunc({text: filterText, sex: filterSex});
//什么类型 + 添加什么函数

//百度联想词_________防抖的知识点之后网络会讲

//********************************++++++++++++++++++++++++++++++ */
//打开思路：
//           订阅模式

function createStore (initState) {
    //传入的如果是初始的initState； 不是的话就赋予一个空对象
    var state = initState || {};
    //订阅过的所有的↓存上
    var list = [];
    //改变或者访问都需要通过这个方法↓(暂时写三个：getstate dispatch subscribe)
    function getState() {
        return state;
    }
    //分发派遣的行为
    function dispatch(action) {
        state[action.type] = action.value;
        list.forEach(function (ele, index) {
            ele();
        })
    }
    function subscribe(func) {
         
    }
    //返回的对象
    return {
        getState: getState,
        dispatch: dispatch,
        subscrib: subscribe
    }
}

var Store = createStore({
    text: '',
    sex: 'a',
    age: 0
});

function show () {
    console.log('sub');
}
Store.subscribe(show);

 
console.log(Store.getState());
Store.dispatch({type: 'text', value: '刘'});
console.log(Store.getState());
Store.dispatch({type: 'sex', value: 'm'});
console.log(Store.getState());
Store.dispatch({type: 'text', value: '王'});