import { defineStore } from "pinia";

export const useQuestionsStore = defineStore("questions", {
    state: () => ({
        questions: [
            {
                question: "question.language",
                subtitle: "subtitle.language",
                type: "single-select",
                answers: [
                    "answers.english",
                    "answers.french",
                    "answers.german",
                    "answers.spanish"
                ],
                selectedValue: null
            },
            {
                id: 2,
                question: "question.gender",
                subtitle: "subtitle.gender",
                type: "single-select",
                answers: ["gender.female", "gender.male", "gender.other"],
                selectedValue: null
            },
            {
                id: 3,
                question: "question.age",
                subtitle: "",
                type: "single-select",
                answers: ["age.18_29",
                    "age.30_39",
                    "age.40_49",
                    "age.50_plus"],
                selectedValue: null
            },
            {
                id: 4,
                question: "question.book_dislike",
                subtitle: "",
                type: "multiple-select",
                answers: [
                    "book_dislike.logic",
                    "book_dislike.speed",
                    "book_dislike.humor",
                    "book_dislike.ending"
                ],
                selectedValue: []
            },
            {
                id: 5,
                question: "question.favorite_topics",
                subtitle: "subtitle.favorite_topics",
                type: "bubble",
                answers: [
                    "topic.werewolf",
                    "topic.action",
                    "topic.royal_obsession",
                    "topic.billionaire",
                    "topic.romance",
                    "topic.young_adult",
                    "topic.bad_boy"
                ],
                selectedValue: []
            },
        ],
    }),
});

export default useQuestionsStore;