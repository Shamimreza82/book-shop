export type IBook = {
    title: string; 
    author: string; 
    price: number; 
    category: "fiction" | "science" | "selfDSelfDevelopment" | "poetry" | "religious"; 
    description: string; 
    quantity: number; 
    inStock: boolean; 
}