import React from "react";

import skills from "../../data/skills.json"
import history from "../../data/history.json"
import { getImageUrl } from "../../utils";


export const Experience = () => {
  return (
    <section id="experiance">
      <h2>Experiance</h2>
      <div>
        <div>{
          skills.map((skill, id) => {
            return <div key={id}>
              <div>
                <img src={getImageUrl(skill.imageSrc)} alt={skill.title}/>
                <p>{skill.title}</p>
              </div>
            </div>})
          }</div>
        <ul>
          {
            history.map((historyItem, id) => {
              return <li key={id}>
                <img src={getImageUrl(historyItem.imageSrc)} alt={`${historyItem.organisation} Logo`}/>
                <div>
                  <h3>{`${historyItem.role}, ${historyItem.organisation}`}</h3>
                  <p>{`${historyItem.startDate} — ${historyItem.endDate}`}</p>
                  <ul>{historyItem.experiences.map((experience, id) => {
                    return <li key={id}>{experience}</li>
                    })}</ul>
                </div>
              </li>
            })
          }
        </ul>
      </div>
    </section>
  );
};