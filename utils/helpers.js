export const fillArrayWithRandomValues=(n,minValue,maxValue)=>{
    const arr=[]
    for(let i=0;i<n;i++)
    {
        const randomValue = Math.random() * (maxValue - minValue) + minValue;
        arr.push(randomValue)
    }
    return arr;
}