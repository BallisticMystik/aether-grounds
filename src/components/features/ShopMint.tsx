/**
 * Shop/Mint Feature Component
 * Marketplace interface for purchasing and minting
 */

import React, { useState } from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import type { FeatureComponentProps } from './types';
import { ShoppingCart, Coins, History, Package } from 'lucide-react';

export function ShopMint({ accessLevel, className = '' }: FeatureComponentProps) {
  const [products] = useState([
    { id: 1, name: 'Premium Coffee NFT', price: '0.5 ETH', type: 'NFT' },
    { id: 2, name: 'Coffee Beans Pack', price: '$29.99', type: 'Product' },
    { id: 3, name: 'Limited Edition Roast', price: '1.2 ETH', type: 'NFT' },
  ]);

  const [transactions] = useState([
    { id: 1, item: 'Premium Coffee NFT', date: '2024-01-15', amount: '0.5 ETH' },
    { id: 2, item: 'Coffee Beans Pack', date: '2024-01-10', amount: '$29.99' },
  ]);

  const canPurchase = accessLevel === 'full';
  const canView = accessLevel !== 'no';

  return (
    <FeatureWrapper featureId="shop-mint" accessLevel={accessLevel} className={className}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <ShoppingCart className="h-8 w-8" />
              Shop & Mint
            </h2>
            <p className="text-muted-foreground mt-2">
              Marketplace for products and NFTs
            </p>
          </div>
        </div>

        {/* Product Listings */}
        {canView && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{product.name}</CardTitle>
                    {product.type === 'NFT' && (
                      <Coins className="h-5 w-5 text-yellow-600" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-2xl font-bold">{product.price}</p>
                      <p className="text-sm text-muted-foreground">{product.type}</p>
                    </div>
                    {canPurchase ? (
                      <Button className="w-full">
                        <Package className="h-4 w-4 mr-2" />
                        {product.type === 'NFT' ? 'Mint' : 'Purchase'}
                      </Button>
                    ) : (
                      <Button className="w-full" disabled>
                        View Only
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Transaction History */}
        {canView && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{transaction.item}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <p className="font-semibold">{transaction.amount}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </FeatureWrapper>
  );
}
