const LinkedList = require('../linked-list/linked-list')

const LanguageService = {
  checkLinkedList(LL) {
    const results = []
    let tempNode = LL.head
    while(tempNode.next !== null) {
      results.push(tempNode.value)
      tempNode = tempNode.next
    }
    results.push(tempNode.value)
    return results
  },
  async getLinkedList(db, language) {
    const wordsLinkedList = new LinkedList()
    let words = await this.getLanguageWords(db, language.id)
    let current = language.head
    while (current !== null){
      let insert = words.find(word => word.id === current )
      wordsLinkedList.insertLast(insert)
      current = insert.next
    }
    return wordsLinkedList
  },
  updateLinkedList(db) {
    let length = wordsLinkedList.length()
    return wordsLinkedList.insertAt(wordsLinkedList.head.value, wordsLinkedList.head.value.memory_value, length, db)
  },
  async updateDatabase(db, updatedNodes, language, headId) {
    await this.updateNode(db, updatedNodes[0])
    await this.updateNode(db, updatedNodes[1])
    await this.updateLanguageTable(db, language, headId)
  },
  updateNode(db, node) {
    return db 
      .from('word')
      .where('id', node.id)
      .update({
        memory_value: node.memory_value,
        correct_count: node.correct_count,
        incorrect_count: node.incorrect_count,
        next: node.next,
      })
  },
  updateLanguageTable(db, language, headId) {
    return db 
    .from('language')
    .where('id', language.id)
    .update({
      head: headId,
      total_score: language.total_score,
    })
  },
  getHead(db, id){
    return db
      .from('language')
      .innerJoin('word','language.head', 'word.id')
      .select(
        'original',
        'total_score',
        'correct_count',
        'incorrect_count',
        'head',
      )
      .where('user_id', id)
      .first()
  },
  serializeGuessResponse(linkedList, updatedNodes, response, score) {
    return {
      nextWord: linkedList.head.value.original,
      wordCorrectCount: updatedNodes[0].correct_count,
      wordIncorrectCount: updatedNodes[0].incorrect_count,
      totalScore: score,
      answer: updatedNodes[0].translation,
      isCorrect: response
    }
  },
  serializeWord(word) {
    return {
      nextWord: word.original,
      totalScore: word.total_score,
      wordCorrectCount: word.correct_count,
      wordIncorrectCount: word.incorrect_count
    }
  },
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .orderBy('id')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },
}

module.exports = LanguageService
