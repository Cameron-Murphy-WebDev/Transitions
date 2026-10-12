# Asynchronous data fetch

**UseEffect** triggers data fetch everytime items change.

**Async function** created to fetch the data. These always return a promise.

**Await** controls timing. Here Promise.all will return an array to the const if all of them are successful, or a reject if one is unsuccessful.

**Map** uses async to get testimonials asynchronously, await pauses callback so another prommise to can return an individual item.

**Ignore** ensure that the useEffect does not return while a fetch is still finishing
