/**
 * Breadcrumb Navigation Component
 * Shows navigation path based on current route
 */

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { getRouteMetadata } from '../../utils/routeMapping';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Build breadcrumb items
  const breadcrumbs = [
    {
      label: 'Home',
      path: '/',
      icon: Home,
    },
  ];

  // Add each path segment
  let currentPath = '';
  pathnames.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const metadata = getRouteMetadata(currentPath);
    breadcrumbs.push({
      label: metadata?.title || segment.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      path: currentPath,
      icon: undefined,
    });
  });

  // Don't show breadcrumbs on home/dashboard
  if (pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'dashboard')) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const Icon = crumb.icon;

        return (
          <React.Fragment key={crumb.path}>
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            {isLast ? (
              <span className="text-foreground font-medium">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path}
                className="hover:text-foreground transition-colors flex items-center gap-1"
              >
                {Icon && <Icon className="h-4 w-4" />}
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
