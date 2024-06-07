import React from 'react';
import { Group,  Text, Accordion } from '@mantine/core';

function AccordionLabel({ mcq, options }) {
    return (
      <Group wrap="nowrap">
        <div>
          <Text>{mcq}</Text>
          <Text size="sm" c="dimmed" fw={400}>
          <ol type="a">
            {Object.entries(options).map(([key, value], index) => (
              <li key={key}>{value}</li>
            ))}
          </ol>
          </Text>
        </div>
      </Group>
    );
  }

const MCQDisplay = ({ mcqs }) => {
  // Convert mcqs object into an array
  const mcqsArray = Object.values(mcqs);

  const items = mcqsArray.map((item) => (
    <Accordion.Item value={item.mcq} key={item.options}  style={{border:'2px solid gray', padding:"20px", borderRadius:"10px", marginBottom:"20px"}}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">Correct Answer: {item.correct}</Text>
        <Text size="sm">Bloom's Taxonomy: {item["Bloom's Taxonomy"]}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion chevronPosition="right" variant="contained" >
    {items}
  </Accordion>
  );
};

export default MCQDisplay;
