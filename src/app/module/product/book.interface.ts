export type IBook = {
    title: string; 
    author: string; 
    price: number; 
    category: "fiction" | "science" | "SelfDevelopment" | "poetry" | "religious"; 
    description: string; 
    quantity: number; 
    inStock: boolean; 
}