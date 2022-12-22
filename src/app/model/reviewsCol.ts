export interface reviewCol{
    id?: string
    alias?: string;
    name?: string;
    image_url?: string;
    is_closed?: boolean;
    is_claimed?: boolean;
    url?: string;
    review_count?: number,
    categories?: Array<Object>;
    rating?: number;
    coordinates?: Object;
    display_phone?: string;
    distance?: number;
    location?: Object;
    price?: string;
    transactions?: Array<string>;
    display_address?: Array<string>;
    phone?: string;
    photos?: Array<string>;
    reviews?: Array<Object>;
    user?: Object;
    profile_url?: string;
    text?: string;
    time_created?: string;
    
    
    

  }

  