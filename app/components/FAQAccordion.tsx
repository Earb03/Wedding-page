'use client';

import { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
  href?: string;
  linkLabel?: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faqAccordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div className={`faqAccordionItem ${isOpen ? 'isOpen' : ''}`} key={item.question}>
            <button
              type="button"
              className="faqAccordionButton"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <strong>{isOpen ? '−' : '+'}</strong>
            </button>

            <div className="faqAccordionPanel">
              <p>
                {item.answer}
                {item.href && item.linkLabel ? (
                  <>
                    {' '}
                    <a href={item.href}>{item.linkLabel}</a>
                  </>
                ) : null}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
