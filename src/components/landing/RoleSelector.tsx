import { content, type LandingRole } from '@/lib/content';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const roles: LandingRole[] = ['farmers', 'roasters', 'hubs'];

export function RoleSelector({
  currentRole,
  onRoleSelect,
}: {
  currentRole: LandingRole;
  onRoleSelect: (role: LandingRole) => void;
}) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
      {roles.map((role) => (
        <button
          key={role}
          onClick={() => onRoleSelect(role)}
          className="group text-left"
          aria-pressed={currentRole === role}
        >
          <Card
            className={cn(
              'relative h-full transform-gpu ring-primary transition-all duration-300 ease-out overflow-hidden',
              'group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-primary/20',
              currentRole === role
                ? 'ring-2 bg-card/80'
                : 'ring-0 ring-transparent'
            )}
          >
            <CardHeader>
              <CardTitle>{content.roles[role].title}</CardTitle>
              <CardDescription className="pt-2">
                {content.roles[role].description}
              </CardDescription>
            </CardHeader>
          </Card>
        </button>
      ))}
    </div>
  );
}
