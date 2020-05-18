const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'The smell of the woods awakes you...everybody is gone. You see a torch next to you. Will you grab it or leave it? * If you want more information on the camping gear inspired for the game click on the buttons below! *',
    options: [
      {
        text: 'Grab the torch',
        setState: { torch: true },
        nextText: 2
      },
      {
        text: 'Leave the torch',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'The torch brighten ups your vision but makes you visible. You see a fellow camper! Would you like to trade? He says',
    options: [
      {
        text: 'Trade the torch for a lantern',
        requiredState: (currentState) => currentState.torch,
        setState: { torch: false, lantern: true },
        nextText: 3
      },
      {
        text: 'Trade the torch for a flashlight',
        requiredState: (currentState) => currentState.torch,
        setState: { torch: false, flashlight: true },
        nextText: 3
      },
      {
        text: 'Ignore the merchant',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'The camper is frightened and leaves in a hurry before you can talk. Your plan is to find the adults at camp but you are sleepy. What will you do?',
    options: [
      {
        text: 'Explore the campsite',
        nextText: 4
      },
      {
        text: 'Sleep in a tent',
        nextText: 5
      },
      {
        text: 'Sleep up the tree',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Exploring the campsite is not a bad idea, however, your fatigue gets to you, you fall asleep and get mauled by a bear',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Sleeping in a tent keeps you nice and warm, however, it will not stop a bear. You bleed out from the beast mighty claws.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Looks like watching Star Wars paid off! You have the high ground! No beast in these woods can climb it!',
    options: [
      {
        text: 'Explore the campsite',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'You have finally arrived to the center of the campsite. Yes! You are half way there but suddenly a bob cat appears!',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your lantern',
        requiredState: (currentState) => currentState.lantern,
        nextText: 9
      },
      {
        text: 'Blind it with your flashlight',
        requiredState: (currentState) => currentState.flashlight,
        nextText: 10
      },
      {
        text: 'Chuck the torch at it',
        requiredState: (currentState) => currentState.torch,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Running away usually works but eating those pizzas and drinking soda gets the better of you, the beast rips off your head!',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You swing your lantern but the bob cat scratches the lantern away. The bob cat eats you for dinner',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Congratulations you have a better view of your death. As a reward the bob cat scratches your eyes off first. Game Over!',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You Chuck that torch at the beast! It is roaring and hurting. Now is your chance! RUN!',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()
