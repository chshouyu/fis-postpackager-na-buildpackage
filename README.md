
创建NA组件化的配置文件

# 规则

根据page目录下的html页面生成config.json文件

# 配置
```js
fis.config.merge({
    modules: {
        postpackager: ["na-buildpackage"]
    },
    settings: {
        postpackager: {
            "na-buildpackage": {
                id: "t10goods"
            }
        }
    }
})
```    
# 选项    
    
## id

config.json中的id字段

## ignoreFile

要忽略的html文件，格式为正则表达式，如

```js
/^\/page\/more.+\.html$/i
```