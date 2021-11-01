// manage each workout separately 
export const Legs=({squat})=>
  <>
    <tr>
      <td>4-6</td>
      <td>3-5</td>
      <td>Barbell Squat</td>
      <td>{squat[6]}</td>
    </tr>
    <tr>
      <td>4</td>
      <td>6-8</td>
      <td>Weighted Lunges</td>
      <td>35lb Dumbbells</td>
    </tr>
    <tr>
      <td>4-6</td>
      <td>8-10</td>
      <td>Leg Extentions</td>
      <td>50-100lbs</td>
    </tr>
  </>
export const Chest=({bench})=>
  <>
    <tr>
      <td>4-6</td>
      <td>3-5</td>
      <td>Flat Bench</td>
      <td>{bench[6]}</td>
    </tr>
    <tr>
      <td>4</td>
      <td>6-8</td>
      <td>Incline Bench</td>
      <td>{bench[0]}</td>
    </tr>
    <tr>
      <td>4-6</td>
      <td>8-10</td>
      <td>Dumbbell Flys</td>
      <td>35lb</td>
    </tr>
  </>
export const Back=({deadlift})=>
  <>
    <tr>
      <td>4-6</td>
      <td>3-5</td>
      <td>DeadLift</td>
      <td>{deadlift[6]}</td>
    </tr>
    <tr>
      <td>4</td>
      <td>6-8</td>
      <td>Weighted Pull-ups</td>
      <td>30lbs</td>
    </tr>
    <tr>
      <td>4-6</td>
      <td>8-10</td>
      <td>Barbell Rows</td>
      <td>115-185lbs</td>
    </tr>
  </>
export const Shoulders=({clean})=>
  <>
    <tr>
      <td>4-6</td>
      <td>3-5</td>
      <td>Clean</td>
      <td>{clean[6]}</td>
    </tr>
    <tr>
      <td>4</td>
      <td>6-8</td>
      <td>Barbell Shoulder Press</td>
      <td>{clean[3]}</td>
    </tr>
    <tr>
      <td>4-6</td>
      <td>8-10</td>
      <td>Dumbbell Shoulder Press</td>
      <td>{clean[0]/2} Dumbbells</td>
    </tr>
    <tr>
      <td>4-6</td>
      <td>8-10</td>
      <td>Side Laterl Raises</td>
      <td>20lb Dumbbells</td>
    </tr>
    <tr>
      <td>4-6</td>
      <td>15-20</td>
      <td>Front Raises</td>
      <td>20lb Dumbbells</td>
    </tr>
  </>
export const Biceps=()=>
  <>
    <tr>
      <td>4-6</td>
      <td>8-12</td>
      <td>Hammer Curl</td>
      <td>35lb Dumbbells</td>
    </tr>
    <tr>
      <td>4</td>
      <td>8-12</td>
      <td>EZ-Bar Curl</td>
      <td>95-135 lbs</td>
    </tr>
    <tr>
      <td>4-6</td>
      <td>8-10</td>
      <td>One Arm Dumbbell Curl</td>
      <td>30lb Dumbbell</td>
    </tr>
    <tr>
      <td>4-6</td>
      <td>8-10</td>
      <td>Reverse Curl</td>
      <td>55-95lbs</td>
    </tr>
  </>
export const Triceps=()=>
  <>
    <tr>
      <td>4-6</td>
      <td>6-8</td>
      <td>Skull Crushers</td>
      <td>95-155lbs</td>
    </tr>
    <tr>
      <td>4</td>
      <td>8-10</td>
      <td>Triceps Pushdown</td>
      <td>As Needed</td>
    </tr>
    <tr>
      <td>4-6</td>
      <td>8-10</td>
      <td>Cable Extension</td>
      <td>As Needed</td>
    </tr>
    <tr>
      <td>4-6</td>
      <td>8-10</td>
      <td>Overhead Dumbbell Extension</td>
      <td>25lb Dumbbells</td>
    </tr>
  </>
export const Calves = ()=>
<>
  <tr>
    <td>4-6</td>
    <td>25-50</td>
    <td>Standing Calf Raises</td>
    <td>200lbs</td>
  </tr>
  <tr>
    <td>4</td>
    <td>25-50</td>
    <td>Seated Calf Raises</td>
    <td>150lbs</td>
  </tr>
</>
export const Abs = () =>
  <>
    <tr>
      <td>4-6</td>
      <td>25-50</td>
      <td>Weighted Sit-ups</td>
      <td>25lbs</td>
    </tr>
    <tr>
      <td>4</td>
      <td>25-50</td>
      <td>Hanging Leg Raises</td>
      <td>None</td>
    </tr>
    <tr>
      <td>4-6</td>
      <td>25 ea. side</td>
      <td>Side Crunch</td>
      <td>N/A</td>
    </tr>
  </>