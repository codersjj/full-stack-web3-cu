// Setup Movie Night

// Cook popcorn
// Pour drinks
// Start movie

async function setupMovieNight() {
  await cookPopcorn()
  await pourDrinks()
  startMovie()
}

function cookPopcorn() {
  console.log('Cooking popcorn...')
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Popcorn is ready!')
      resolve()
    }, 1000)
  })
}

function pourDrinks() {
  console.log('Pouring drinks...')
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Drinks are ready!')
      resolve()
    }, 1000)
  })
}

function startMovie() {
  console.log('Starting movie...')
  // some code here
}

setupMovieNight()
