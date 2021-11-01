const meat = [
  {food:'Lamb', serving:'4oz', calories:250, protein:30, carbs:0,  fat:14},
  {food:'Steak (Top Round)', serving:'4oz', calories:210, protein:36, carbs:0,  fat:7},
  {food:'Steak (T-Bone)', serving:'4oz', calories:450, protein:25, carbs:0,  fat:35},
  {food:'Hamburger', serving:'4oz', calories:307, protein:28, carbs:0,  fat:22},
  {food:'Roast Beef', serving:'4oz', calories:420, protein:25.3, carbs:0,  fat:34},
  {food:'Bacon', serving:'3 strips', calories:110, protein:6, carbs:0,  fat:9},
  {food:'Bologna', serving:'2 slices', calories:180, protein:7, carbs:0,  fat:16},
  {food:'Ham (Roasted)', serving:'4oz', calories:273, protein:24, carbs:0,  fat:14},
  {food:'Hot Dog', serving:'1ea', calories:145, protein:5, carbs:0,  fat:13},
  {food:'Salami', serving:'2 slices', calories:145, protein:8, carbs:0,  fat:12},
  {food:'Chicken (breast)', serving:'4oz', calories:187, protein:36, carbs:0,  fat:4},
  {food:'Turkey (light)', serving:'4oz', calories:180, protein:33, carbs:0,  fat:4},
  {food:'Turkey (dark)', serving:'4oz', calories:213, protein:32, carbs:0,  fat:8},
  {food:'Fish Sticks', serving:'1ea', calories:70, protein:6, carbs:0,  fat:3},
  {food:'Halibut', serving:'4oz', calories:187, protein:21, carbs:0,  fat:8},
  {food:'Oysters', serving:'1/2cup', calories:160, protein:27, carbs:0,  fat:4},
  {food:'Salmon (canned)', serving:'1cup', calories:160, protein:20, carbs:0,  fat:6},
  {food:'Sardines (canned)', serving:'4oz', calories:233, protein:27, carbs:0,  fat:13},
  {food:'Tuna (water)', serving:'4oz', calories:180, protein:40, carbs:0,  fat:1.3},
  {food:'Tuna (oil)', serving:'4oz', calories:220, protein:32, carbs:0,  fat:9}
]
const beansLentilsPeas = [
  {food:'Baked Beans', serving:'1cup', calories:236, protein:12, carbs:52,  fat:0},
  {food:'Black Beans', serving:'1cup', calories:225, protein:15, carbs:41,  fat:0},
  {food:'Chickpeas', serving:'1cup', calories:270, protein:15, carbs:45,  fat:0},
  {food:'Green Beans', serving:'1cup', calories:115, protein:8, carbs:21,  fat:0},
  {food:'Kidney Beans', serving:'1cup', calories:230, protein:15, carbs:42,  fat:0},
  {food:'Lentils', serving:'1cup', calories:215, protein:16, carbs:38,  fat:0},
  {food:'Lima Beans', serving:'1cup', calories:260, protein:16, carbs:49,  fat:0},
  {food:'Navy Beans', serving:'1cup', calories:225, protein:15, carbs:40,  fat:0},
  {food:'Pinto Beans', serving:'1cup', calories:265, protein:15, carbs:49,  fat:0},
  {food:'Refried Beans', serving:'1cup', calories:295, protein:18, carbs:51,  fat:0}
]
const breadsGrains =[
  {food:'Bagel', serving:'1ea', calories:200, protein:7, carbs:38,  fat:0},
  {food:'Biscuit', serving:'1ea', calories:95, protein:2, carbs:14,  fat:5},
  {food:'Bead (wheat)', serving:'1 slice', calories:65, protein:2, carbs:11,  fat:1},
  {food:'Bread (grain)', serving:'1 slice', calories:65, protein:2, carbs:12,  fat:1},
  {food:'Bread (oatmeal)', serving:'1 slice', calories:65, protein:2, carbs:11,  fat:1},
  {food:'Bread (raisin)', serving:'1 slice', calories:65, protein:2, carbs:13,  fat:1},
  {food:'Bread (wholewheat)', serving:'1 slice', calories:70, protein:3, carbs:13,  fat:1},
  {food:'English Muffin', serving:'1ea', calories:140, protein:5, carbs:27,  fat:1},
  {food:'Pita Bread', serving:'1ea', calories:165, protein:6, carbs:33,  fat:0},
  {food:'Pasta', serving:'1cup', calories:200, protein:7, carbs:37,  fat:0},
  {food:'Spaghetti', serving:'1cup', calories:155, protein:5, carbs:32,  fat:0},
  {food:'Rice Cake', serving:'2ea', calories:70, protein:0, carbs:15,  fat:0},
  {food:'Rice (white)', serving:'1cup', calories:225, protein:4, carbs:50,  fat:0},
  {food:'Rice (brown)', serving:'1cup', calories:216, protein:5, carbs:45,  fat:0}
]
const cerealsBreakfast =[
  {food:'All Bran', serving:'1oz', calories:110, protein:4, carbs:21,  fat:0},
  {food:'Cheerios', serving:'1oz', calories:110, protein:4, carbs:20,  fat:0},
  {food:'Granola (NatureValley)', serving:'1oz', calories:125, protein:3, carbs:19,  fat:5},
  {food:'Grape-Nuts', serving:'1oz', calories:100, protein:3, carbs:23,  fat:0},
  {food:'Oatmeal', serving:'1cup', calories:145, protein:6, carbs:25,  fat:0},
  {food:'Pancakes', serving:'3md', calories:249, protein:2, carbs:33,  fat:0},
  {food:'Raisin Bran', serving:'1oz', calories:90, protein:3, carbs:21,  fat:0},
  {food:'Shredded Wheat', serving:'1ea', calories:83, protein:3, carbs:19,  fat:0},
  {food:'Special K', serving:'1oz', calories:110, protein:6, carbs:21,  fat:0},
  {food:'Total', serving:'1oz', calories:100, protein:3, carbs:22,  fat:0},
  {food:'Waffles', serving:'2lg', calories:410, protein:2, carbs:54,  fat:0},
  {food:'Wheaties', serving:'1oz', calories:100, protein:3, carbs:23,  fat:0}
]
const dairy =[
  {food:'Buttermilk', serving:'1cup', calories:99, protein:8, carbs:12,  fat:2},
  {food:'Cottage Cheese', serving:'1cup', calories:232, protein:28, carbs:6,  fat:10},
  {food:'Ice Cream', serving:'1cup', calories:264, protein:5, carbs:31,  fat:15},
  {food:'Milkshake', serving:'1cup', calories:380, protein:13, carbs:60,  fat:10},
  {food:'Milk(whole)', serving:'1cup', calories:150, protein:8, carbs:11,  fat:8},
  {food:'Milk(2%)', serving:'1cup', calories:121, protein:8, carbs:12,  fat:5},
  {food:'Milk(skim)', serving:'1cup', calories:86, protein:8, carbs:12,  fat:3},
  {food:'Chocolate MIlk', serving:'1cup', calories:208, protein:12, carbs:26,  fat:9},
  {food:'Yogurt(plain)', serving:'8oz', calories:253, protein:10, carbs:43,  fat:4},
  {food:'Yogurt(non-fat)', serving:'8oz', calories:127, protein:13, carbs:18,  fat:1.2}
  
]
const fruitsVeggies =[
  {food:'Apple', serving:'1ea', calories:80, protein:0, carbs:20,  fat:0},
  {food:'Avacado', serving:'1ea', calories:306, protein:0, carbs:12,  fat:30},
  {food:'Banana', serving:'1ea', calories:127, protein:0, carbs:6,  fat:0},
  {food:'Broccoli', serving:'1ea', calories:32, protein:0, carbs:13,  fat:0},
  {food:'Cantaloupe', serving:'1cup', calories:56, protein:0, carbs:10,  fat:0},
  {food:'Carrots', serving:'1lg', calories:42, protein:0, carbs:3,  fat:0},
  {food:'Cauliflower', serving:'1/2cup', calories:13, protein:0, carbs:34,  fat:0},
  {food:'Corn', serving:'1cup', calories:134, protein:0, carbs:20,  fat:0},
  {food:'Grapefruit', serving:'1ea', calories:78, protein:0, carbs:8,  fat:0},
  {food:'Grapes', serving:'1/2cup', calories:29, protein:0, carbs:16,  fat:0},
  {food:'Oranges', serving:'1ea', calories:64, protein:0, carbs:30,  fat:0},
  {food:'Pear', serving:'1ea', calories:118, protein:0, carbs:8,  fat:0},
  {food:'Plum', serving:'1ea', calories:36, protein:0, carbs:32,  fat:0},
  {food:'Potato', serving:'1ea', calories:145, protein:0, carbs:28,  fat:0},
  {food:'Raisins', serving:'1/4cup', calories:109, protein:0, carbs:28,  fat:0},
  {food:'Sweet Potato', serving:'1md', calories:117, protein:0, carbs:27,  fat:0},
  {food:'Tomato', serving:'1md', calories:25, protein:0, carbs:5,  fat:0}
]

export {
  meat,
  beansLentilsPeas,
  breadsGrains,
  cerealsBreakfast,
  dairy,
  fruitsVeggies
}