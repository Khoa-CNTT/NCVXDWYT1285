import './AccordionItem.scss';
import { useRef } from 'react';

export const AccordionItem = (props) => {
  const contentEl = useRef();
  const { handleToggle, active, faq } = props;
  const { header, id, text } = faq;

  console.log(active.indexOf(id) !== -1);
  return (
    <div className="rc-accordion-card">
      <div className="rc-accordion-header">
        <div
          className={`rc-accordion-toggle p-3 ${active.indexOf(id) !== -1 ? 'active' : ''}`}
          onClick={() => handleToggle(id)}
        >
          <h5 className="rc-accordion-title">{header}</h5>
          <i className="fa fa-chevron-down rc-accordion-icon"></i>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`rc-collapse ${active.indexOf(id) !== -1 ? 'show' : ''}`}
        style={active.indexOf(id) !== -1 ? { height: contentEl.current.scrollHeight } : { height: '0px' }}
      >
        <div className="rc-accordion-body">
          <div dangerouslySetInnerHTML={{ __html: text }}></div>
        </div>
      </div>
    </div>
  );
};
