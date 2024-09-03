import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown-dark.css';
const MarkdownDisplay = ({ markdownContent }:{markdownContent:string}) => {
    return (
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw,rehypeHighlight]}>
          {markdownContent}
        </ReactMarkdown>
    </div>
    );
  };

export default MarkdownDisplay;
