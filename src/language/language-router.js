const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const jsonBodyParser = express.json()

const languageRouter = express.Router()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )
      // LanguageService.setLinkedList(words)

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try {
      let head = await LanguageService.getHead(req.app.get('db'), req.language.user_id)
      console.log(head)
      head = LanguageService.serializeWord(head)
      res.json(head)
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .route('/guess')
  .post(jsonBodyParser, async (req, res, next) => {
    const { guess } = req.body
    if (!req.body.guess)
      return res.status(400).json({
        error: `Missing 'guess' in request body`
      })
    try {
      let linkedList = await LanguageService.getLinkedList(req.app.get('db'), req.language)
      let response = null
      if(guess === linkedList.head.value.translation) {
        linkedList.head.value.memory_value *= 2
        linkedList.head.value.correct_count++
        req.language.total_score++
        response = true
      } else {
        linkedList.head.value.memory_value = 1
        linkedList.head.value.incorrect_count++
        response = false
      }
      let updatedNodes = await linkedList.insertAt(linkedList.head.value, linkedList.head.value.memory_value, linkedList.length())
      let lL = await LanguageService.checkLinkedList(linkedList)
      await LanguageService.updateDatabase(req.app.get('db'), updatedNodes, req.language, linkedList.head.value.id)
      res.json(LanguageService.serializeGuessResponse(linkedList, updatedNodes, response, req.language.total_score))
      
      next()
    } catch (error) {
      next(error)
    }
    // res.send(answer)
  })

module.exports = languageRouter
