import React, { useState, useEffect } from 'react';
import '../../styles/main.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import FloatingButton from '../../utils/FloatingButton';
import { isEmptyObject } from '../../utils/common';
import Header from '../header/Header';

const ListItem = ({ question }) => {
  return (
    <Link to={`/answer/${question.answerId}`}>
      <div className="item">
        <div className="thumbnail" />
        <div className="question">{question.questionContent}</div>
      </div>
    </Link>
  );
};

const List = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_HOST}/answer`,
          {},
          { 'Content-Type': 'application/json', withCredentials: true },
        );
        setQuestions(response.data);
        setQuestions(
          questions.filter(
            question =>
              question.answerContent !== null || question.answerContent !== '',
          ),
        );
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return <div>대기 중...</div>;
  }
  if (questions.length === 0) {
    return <div>죄송합니다. 오류가 발생하였습니다.</div>;
  }
  return (
    <div className="container">
      <Header />
      <div className="content list">
        {questions.map(question => (
          <ListItem question={question} key={question.answerId} />
        ))}
      </div>
      <FloatingButton children={<MdModeEdit size={25} />} to="/answer/add" />
    </div>
  );
};

export default List;
