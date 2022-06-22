export const CustomFetchProducts = (time, task, category) => {

  const filterProduct = task.filter (
    (task) => task.category === category
  );
  
  return new Promise((resolve, reject) =>{
    setTimeout(() =>{
    if (category) {
      resolve(filterProduct);
    } else {
      resolve(task)
    }
  },time)})}


export const CustomFetchItemDetail = (time, task, id) => {

  const findProduct = task.find (
    (task) => task.id === Number(id)
  );
  return new Promise((resolve, reject) =>{
    setTimeout(() =>{

      resolve(findProduct);

  },time)})}
