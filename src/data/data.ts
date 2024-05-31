interface Product
{
    id:number
    productName:string 
    productQuantity:number
    productPrice:number
}


const ProductData:Product[]=[
    {
        id:0,
        productName:"Mobile",
        productQuantity:1,
        productPrice:8000
    },
    {
        id:1,
        productName:"Smart Watch",
        productQuantity:1,
        productPrice:2000
    },
    {
        id:2,
        productName:"Gaming Console",
        productQuantity:1,
        productPrice:5000
    }
]

export default ProductData