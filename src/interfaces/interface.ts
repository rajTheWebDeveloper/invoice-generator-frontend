export interface SignUpDetailsType
{
    name:string 
    email:string 
    password:string
    confirmPassword:string
}


export interface SignUpErrorsType 
{
    name?:string 
    email?:string 
    password?:string
    confirmPassword?:string
}


export interface SignInDetailsType
{
    email:string 
    password:string
}


export interface SignInErrorsType 
{
    email?:string 
    password?:string
}


export interface ProductsType 
{
    productName:string 
    productQuantity:number 
    productRate:number
}

export interface ProductErrorsType 
{
    productName?:string 
    productQuantity?:string
    productRate?:string
}