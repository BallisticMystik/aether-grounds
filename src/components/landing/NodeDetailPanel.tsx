import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { content, type ChainNode } from '@/lib/content';
import { CheckCircle2 } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';

// Simple hash function for demonstration purposes
const stringToHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
};

export function NodeDetailPanel({ node }: { node: ChainNode }) {
  const nodeContent = content.chainOfCustody.nodes[node];

  // useMemo ensures the ID is stable across re-renders for the same node
  const nodeId = useMemo(() => {
    const uniqueHash = stringToHash(node);
    return `ethr:${node}:${uniqueHash}`;
  }, [node]);

  const prevNodeHash = useMemo(
    () => stringToHash(nodeId).substring(0, 12),
    [nodeId]
  );

  const commentText = `// Data payload for '${node}' stage signed.
// Attaching to previous node: ${prevNodeHash}...
// Transaction broadcasted to network.
// Immutable record created on Aether.v1.`;
  const [animatedComment, setAnimatedComment] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Typing effect
  useEffect(() => {
    setIsTyping(true);
    setAnimatedComment('');
    let i = 0;
    const typingInterval = setInterval(() => {
      setAnimatedComment(commentText.substring(0, i));
      i++;
      if (i > commentText.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 25);

    return () => clearInterval(typingInterval);
  }, [commentText]);

  // Cursor blinking effect
  useEffect(() => {
    if (isTyping) {
      setShowCursor(true);
      return;
    }
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [isTyping]);

  return (
    <Card className="overflow-hidden bg-card/80 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/20 p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/80 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
            </span>
            <p className="font-code text-sm font-semibold uppercase tracking-widest text-primary">
              Active Node: {nodeContent.title}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold text-foreground">
              {nodeContent.title}
            </h3>
            <p className="mt-2 text-muted-foreground">
              {nodeContent.description}
            </p>
          </div>
          <div className="font-code text-sm md:col-span-2">
            <div className="rounded-lg border bg-background/50 p-4">
              <p>
                <span className="text-primary">schema</span> Aether.v1
              </p>
              <p>
                <span className="text-primary">node_id</span>{' '}
                <span className="text-muted-foreground">{nodeId}</span>
              </p>
              <p>
                <span className="text-primary">status</span>{' '}
                <span className="inline-flex items-center gap-1.5 text-green-400">
                  <CheckCircle2 size={14} /> verified
                </span>
              </p>
              <p className="mt-4 min-h-[120px]">
                <span className="text-green-400 whitespace-pre-wrap">
                  {animatedComment}
                  {showCursor && (
                    <span
                      className="inline-block h-4 w-2 animate-pulse bg-green-400 ml-0.5"
                      style={{ transform: 'translateY(2px)' }}
                    ></span>
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
