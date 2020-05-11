/**
 * Created by weiwei on 2018/5/19.
 */
module.exports = async(t)=>{
  return new Promise((resolve)=>{
      const timer = setTimeout(()=>{
          clearTimeout(timer);
          resolve();
      }, t);
  });
};