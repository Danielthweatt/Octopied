/**
 * This lets you to spend your points to get upgrade materials
 * 
 * @method buyResource
 * @param {any} itemName 
 * @param {number} [count=1] 
 */
export function buyResource(itemName, count = 1){
    console.log(points, tradeCost[itemName]);
    if(points > tradeCost[itemName] * count){
        resources[itemName]++;
        this.points -= tradeCost[itemName] * count;
        $('.counter').text(this.points);
        const selector = '.resource-' + [itemName];
        $(selector).text( resources[itemName])
    }else{
        const toastHTML = 'You dont have enough points!';
        M.toast({html: toastHTML});
    }
}


/**
 * This will let you use resources to use this you need to input the 
 * name of the item and the quanity and it will either spend the points or 
 * it will sent a message letting the user know they do not have the required resources
 * 
 * @method buyItem
 * @param {any} itemName 
 * @param {number} [count=1] 
 */
export function buyItem(itemName, count = 1){
    if(resources[itemName] >  count){
        resources[itemName] -= count;
        $(`.${itemName}` ).text( resources[itemName]);
        const selector = '.resource-' + [itemName];
        $(selector).text( resources[itemName])
    }else{
        const toastHTML = `you dont have enough ${itemName}s!`
        M.toast({html: toastHTML});
    }
}

