export const itemsPerLoad = 6;




export type FilterItem = {
    value: string;
    label: string;
}


export function convertToFilterList(items: string[]): FilterItem[] {
    var list: FilterItem[] = [];
    for (let item of items) {
        list.push({ value: item, label: item });
    }
    return list;
}


export const categoryOptions = [
    'Beef',
    'Breakfast',
    'Chicken',
    'Dessert',
    'Goat',
    'Lamb',
    'Miscellaneous',
    'Pasta',
    'Pork',
    'Seafood',
    'Side',
    'Starter',
    'Vegan',
    'Vegeterian',
]


export const areaOptions = [
    'American',
    'British',
    'Canadian',
    'Chinese',
    'Croatian',
    'Dutch',
    'Egyptian',
    'French',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Jamaican',
    'Japanese',
    'Kenyan',
    'Malaysian',
    'Mexican',
    'Morrocan',
    'Polish',
    'Portuguese',
    'Russian',
    'Spanish',
    'Thai',
    'Tunisian',
    'Turkish',
    'Unknown',
    'Vietnamese',
]
