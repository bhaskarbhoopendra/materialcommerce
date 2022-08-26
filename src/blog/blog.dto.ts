import { IsString } from "class-validator"

class BlogDTo {
    @IsString()
    title: string;
    
    @IsString()
    description: string;
}

export default BlogDTo