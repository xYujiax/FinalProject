<script>
    import Slide from './slide.svelte' // imports slide template

    // stuff to trigger end of presentation
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    function finishPresentation() {
        dispatch('presentation-finished');
    }
</script>

<style>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  img {
    float: left;
    width: 800px;
    height: auto;
  }
  
  .text {
    float: left;
    word-wrap: break-word;
    text-align: left;
    font-size: 1.2rem
  }

  #nuke {
    background-color: transparent;
    border: none;
    color: red; /* Green text */
    cursor: pointer;
  }

  #nuke:hover {
    color: #4CAF50; /* White text on hover */
  }
  
</style>


<Slide animate>
    <div class='text-blue-500 mt-2'> Welcome to an Exploratory Intro to CLT!</div>
    <div data-auto-animate-delay=1> Some tips for navigating:
    <ul data-auto-animate-delay=1 class='list-square'>
        <li class='text-sm mt-4'>Use your computer arrow keys or click the arrows on the bottom right</li>
        <li class='text-sm mt-2'>Slide numbers are found at the bottom right of the screen</li>
        <li class='text-sm mt-2'>To skip to a slide, enter 'g' on your keyboard, and then type the desired number of the slide you wish to see</li>
        <li class='text-sm mt-2'><strong>Skip to the last slide to play with our interactive CLT simulator!</strong></li>
    </ul>
    </div>
</Slide>

<Slide animate>
    <div class='text-blue-500 mt-8'>The heck is CLT anyway?</div>
    <p data-auto-animate-delay=1 class='text-base'>CLT is a super clutch theory used in probability and statistics. </p>
    <p data-auto-animate-delay=2 class='text-base'>It says that the distribution of sample means taken from any population will be approximately normal and centered around the true population mean.</p>
    <p data-auto-animate-delay=3 class='text-base'>That already sounds confusing, so we’ll explain more as we go!</p>
</Slide>

<Slide animate>
    <div class='text-blue-500 mt-8'>Let's take a look at Iris flower sepal lengths!</div>
    <div class='container'>
        <div class='image'>
            <img src="../../../src/components/deck/notfeetpics/iris1.png" alt = 'regular Iris petal distribution (slightly normal)'>
        </div> 
        <div class='text'> Here’s a distribution of Iris flower sepal lengths. It has a sorta normal (bell-curvy) looking distribution, but not really. We’ll do something interesting:
            
                <ol>
                    <li class='text-sm mt-2' data-auto-animate-delay=3>Randomly sample <strong>30 sepal lengths</strong> from this distribution (with replacement)</li>
                    <li class='text-sm mt-2' data-auto-animate-delay=4>Calculate the <strong>mean</strong> of that sample  </li>
                    <li class='text-sm mt-2' data-auto-animate-delay=5>Repeat step 1-2 again <strong>1000</strong> times. </li>
                    <li class='text-sm mt-2' data-auto-animate-delay=6>Plot all those sample means in a histogram!</li>
                </ol>
        </div>
    </div>
</Slide>

<Slide animate>
    <div class='text-blue-500 mt-8'>Tadaaa~</div>
    <div class='container'>
        <div class='image'>
            <img src="../../../src/components/deck/notfeetpics/iris2.png" alt = 'regular Iris petal distribution (slightly normal)'>
        </div> 
        <div class='text'> 
            <p class='mt-2'>Notice how it looks a lot more like a <strong>normal distribution</strong>?</p>
            <p class='mt-2' data-auto-animate-delay=2>The CLT dictates that the bigger your sample size is, the more the distribution of the sample means tends towards a normal distribution. <strong>This happens no matter what shape your original distribution looks like!</strong></p>
            <p class='mt-2' data-auto-animate-delay=5><strong><em>Most experts say that having a sample size of about 30 or greater is enough to see this happen. Let’s test this out with another dataset!</em></strong></p>
        </div>
    </div>
</Slide>

<Slide animate>
    <div class='text-blue-500 mt-8'>Now let's look at US County Populations!</div>
    <div class='container'>
        <div class='image'>
            <img src='../../../src/components/deck/notfeetpics/county3.png' alt = 'regular Iris petal distribution (slightly normal)'>
        </div> 
        <div class='text'> This is unbelievable skewed! This is likely due to a few outlier counties with insanely large populations:
            <br><br><strong>Can CLT live up to its name even with this dataset?</strong>
            <br><br>Let's repeat the same process we used to see CLT in the Iris Sepal dataset:
            
                <ol>
                    <li class='text-sm mt-2' data-auto-animate-delay=3>Randomly sample <strong>30 county populations</strong> from this distribution (with replacement)</li>
                    <li class='text-sm mt-2' data-auto-animate-delay=4>Calculate the <strong>mean</strong> of that sample  </li>
                    <li class='text-sm mt-2' data-auto-animate-delay=5>Repeat step 1-2 again <strong>1000</strong> times. </li>
                    <li class='text-sm mt-2' data-auto-animate-delay=6>Plot all those sample means in a histogram!</li>
                </ol>
        </div>
    </div>
</Slide>

<Slide animate>
    <div class='text-blue-500 mt-8'>*Gasp*</div>
    <div class='container'>
        <div class='image'>
            <img src='../../../src/components/deck/notfeetpics/county4.png' alt = 'regular Iris petal distribution (slightly normal)'>
        </div> 
        <div class='text'>There's no way that sample mean distribution looks normal! Have we been lied too???
            <br><br><strong>Was CLT just a scam all along? How can this be?!</strong>
        </div>
    </div>
</Slide>

<Slide animate>
    <div class='text-blue-500 mt-8'>THIS REQUIRES INVESTIGATION!!!</div>
    <div class='container'>
        <div class='image'>
            <img src='../../../src/components/deck/notfeetpics/county5.png' alt = 'regular Iris petal distribution (slightly normal)'>
        </div> 
        <div class='text'>
            <ul style='list-style-type: none'>An interesting point of consideration:
                <li class='text-sm mt-2' data-auto-animate-delay=1>This dataset has 3094 population entries!</li>
                <li class='text-sm mt-2' data-auto-animate-delay=2>Everytime we randomly choose a random sample of 30, there’s a very high chance that we only sample small populations because the data is so skewed.  This would make our sample means also skewed to the right and lower than our true population mean. </li>
                <li class='text-sm mt-2' data-auto-animate-delay=5><strong>What if we took a fatter sample size instead?</strong></li>
        </ul> 
        </div>
    </div>
</Slide>

<Slide animate>
    <div class='text-blue-500 mt-8'>Taking a bigger sample size</div>
    <div class='container'>
        <div class='image'>
            <img src='../../../src/components/deck/notfeetpics/county6.png' alt = 'regular Iris petal distribution (slightly normal)'>
        </div> 
        <div class='text'>
            <ul style='list-style-type: none'>
                <li class='text-sm mt-2' data-auto-animate-delay=1>It looks a lot better! Still kind of off, but it's looking a lot more fine and <em>normal</em> now ;)</li>
                <li class='text-sm mt-2' data-auto-animate-delay=2>It looks like taking a substantially larger sample size of 300 to calculate each sample mean ended up working.</li>
                <li class='text-sm mt-2' data-auto-animate-delay=5><strong>What if we took an even bigger sample size?                </strong></li>
        </ul> 
        </div>
    </div>
</Slide>

<Slide animate>
    <div class='text-blue-500 mt-8'>Going balls to the wall!</div>
    <div class='container'>
        <div class='image'>
            <img src='../../../src/components/deck/notfeetpics/county7.png' alt = 'regular Iris petal distribution (slightly normal)'>
        </div> 
        <div class='text'>
            <ul style='list-style-type: none'>
                <li class='text-sm mt-2' data-auto-animate-delay=1>Now would you look at that! Taking a sample of 3000 to calculate each sample mean really changes things!</li>
                <li class='text-sm mt-2' data-auto-animate-delay=2>How come though?</li>
                <li class='text-sm mt-2' data-auto-animate-delay=5><strong>Although experts generally say that taking sample sizes of 30 is enough to see the CLT in action, that is too small for extra hunky datasets like this one!</li>
            </ul> 
        </div>
    </div>
</Slide>

<Slide animate>
    <div class='text-blue-500 mt-2'>Moral of the story?</div>
    
    <p class='text-sm mt-2'style="font-size: 16px;" data-auto-animate-delay=1>Even if you have a small brain...</p>
    <p class='text-sm mt-2'style="font-size: 18px;" data-auto-animate-delay=3>Even if an expert with a bigger brain tells you something...</p>
    <p class='text-sm mt-2' style="font-size: 20px;" data-auto-animate-delay=5><strong>YOU MUST NOT SUCCUMB</strong></p>
    <p class='text-sm mt-2' style="font-size: 22px;" data-auto-animate-delay=7><strong>TO THE OPINIONS OF THE BIGGER BRAINED PERSON</strong></p>
    <p class='text-sm mt-2' style="font-size: 24px;" data-auto-animate-delay=9><strong>WITHOUT TESTING AND VERIFYING FIRST</strong></p>
</Slide>

<Slide animate>
    <div class='text-blue-500 mt-2'>Ty for coming to our TedTalk ❤️</div>
    
    <p class='mt-2 text-xl'data-auto-animate-delay=1>Still feel like testing out different datasets and sample sizes to understand CLT?</p>
    <p class='mt-2 text-xl'data-auto-animate-delay=3>Worry not -- We have just the thing to help you out!</p>
    <button id='nuke' class='text-lg' data-auto-animate-delay=5>Click here to continue exploring!</button>

</Slide>
