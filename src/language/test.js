const LinkedList = require('../linked-list/linked-list')

const wordsLinkedList = new LinkedList()

const testWords = [
  {
    "id": 1,
    "original": "original 1",
    "translation": "translation 1",
    "memory_value": 0,
    "incorrect_count": 0,
    "correct_count": 0,
    "language_id": 1,
    "next": 2
  },
  {
    "id": 2,
    "original": "original 2",
    "translation": "translation 2",
    "memory_value": 0,
    "incorrect_count": 0,
    "correct_count": 2,
    "language_id": 1,
    "next": 3
  },
  {
    "id": 3,
    "original": "original 3",
    "translation": "translation 3",
    "memory_value": 0,
    "incorrect_count": 3,
    "correct_count": 6,
    "language_id": 1,
    "next": 4
  },
  {
    "id": 4,
    "original": "original 4",
    "translation": "translation 4",
    "memory_value": 0,
    "incorrect_count": 2,
    "correct_count": 6,
    "language_id": 1,
    "next": 5
  },
  {
    "id": 5,
    "original": "original 5",
    "translation": "translation 5",
    "memory_value": 0,
    "incorrect_count": 0,
    "correct_count": 9,
    "language_id": 1,
    "next": null
  }
]

testWords.forEach(word => {
  wordsLinkedList.insertLast(word)
})



function checkAnswer(db, guess) {
  let nodeValue = wordsLinkedList.head.value
  let memoryValue = nodeValue.memory_value
  let length = wordsLinkedList.length()
  if(guess === nodeValue.translation) {
    db
      .from('word')
      .update({
        memory_value: (memoryValue * 2),
        thisKeyIsSkipped: undefined
      })
    nodeValue.memory_value *= 2
    wordsLinkedList.insertAt(nodeValue, nodevalue.memory_value, length)
  } else {
    db
      .from('word')
      .update({
        memory_value: 1,
        thisKeyIsSkipped: undefined
      })
    nodeValue.memory_value = 1
    wordsLinkedList.insertAt(nodeValue, nodeValue.memory_value, length)
  }
}
