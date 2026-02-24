"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Save, Share, Plus, Minus, Circle, AlertCircle } from 'lucide-react';

const CricketScorecard = () => {
  const [matchType, setMatchType] = useState('ODI'); // ODI, T20, TEST
  const [inningsNumber, setInningsNumber] = useState(1);
  const [maxOvers, setMaxOvers] = useState(50);
  const [powerPlayOvers, setPowerPlayOvers] = useState({ start: 1, end: 10 });
  const [dls, setDls] = useState({ 
    isActive: false, 
    targetScore: 0, 
    revisedOvers: 0 
  });

  const [innings, setInnings] = useState({
    team: '',
    battingTeam: '',
    bowlingTeam: '',
    runs: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
    extras: {
      wides: 0,
      noBalls: 0,
      byes: 0,
      legByes: 0,
      penalties: 0
    },
    currentOver: [],
    isFreeHit: false,
    lastDeliveryType: null,
    isPowerPlay: true,
    batsmen: [
      { id: 1, name: '', runs: 0, balls: 0, fours: 0, sixes: 0, status: 'Not Out', onStrike: true },
      { id: 2, name: '', runs: 0, balls: 0, fours: 0, sixes: 0, status: 'Not Out', onStrike: false }
    ],
    bowlers: [
      { name: '', overs: 0, maidens: 0, runs: 0, wickets: 0, currentBowler: true, runsInOver: 0, maxOvers: 10 }
    ],
    ballByBall: [],
    partnerships: [{
      runs: 0,
      balls: 0,
      batsmen: []
    }],
    fallOfWickets: []
  });

  // Wicket Modal State
  const [wicketModal, setWicketModal] = useState({
    isOpen: false,
    type: '',
    fielder: '',
    newBatsman: '',
    outBatsman: null
  });

  const DISMISSAL_TYPES = [
    'Bowled',
    'Caught',
    'LBW',
    'Run Out',
    'Stumped',
    'Hit Wicket',
    'Caught & Bowled',
    'Timed Out',
    'Obstructing the Field',
    'Hit the Ball Twice'
  ];

  const [dismissalType, setDismissalType] = useState(DISMISSAL_TYPES[0]);
  const [fielder, setFielder] = useState('');
  const [isWicketModalOpen, setIsWicketModalOpen] = useState(false);

  const addDelivery = (type, runs = 0, isExtra = false) => {
    setInnings(prev => {
      const newState = { ...prev };
      const currentBowler = prev.bowlers.find(b => b.currentBowler);
      const striker = prev.batsmen.find(b => b.onStrike);
      
      // Handle different delivery types
      switch(type) {
        case 'WIDE':
          newState.extras.wides++;
          newState.runs += 1 + runs;
          if(currentBowler) {
            currentBowler.runs += 1 + runs;
            currentBowler.runsInOver += 1 + runs;
          }
          break;

        case 'NO_BALL':
          newState.extras.noBalls++;
          newState.runs += 1 + runs;
          newState.isFreeHit = true;
          if(currentBowler) {
            currentBowler.runs += 1 + runs;
            currentBowler.runsInOver += 1 + runs;
          }
          if(striker && runs > 0) {
            striker.runs += runs;
          }
          break;

        case 'BYE':
        case 'LEG_BYE':
          newState.runs += runs;
          newState.balls++;
          if(striker) striker.balls++;
          if(type === 'BYE') newState.extras.byes += runs;
          else newState.extras.legByes += runs;
          break;

        case 'REGULAR':
          newState.runs += runs;
          newState.balls++;
          if(striker) {
            striker.runs += runs;
            striker.balls++;
            if(runs === 4) striker.fours++;
            if(runs === 6) striker.sixes++;
          }
          if(currentBowler) {
            currentBowler.runs += runs;
            currentBowler.runsInOver += runs;
          }
          newState.isFreeHit = false;
          break;
      }

      // Update overs
      if(type !== 'WIDE' && type !== 'NO_BALL') {
        const isOverComplete = (newState.balls % 6 === 0);
        if(isOverComplete && currentBowler) {
          currentBowler.overs++;
          if(currentBowler.runsInOver === 0) currentBowler.maidens++;
          currentBowler.runsInOver = 0;
          // Rotate strike at end of over
          newState.batsmen = newState.batsmen.map(b => ({
            ...b,
            onStrike: !b.onStrike
          }));
        }
      }

      // Rotate strike for odd runs
      if(runs % 2 === 1) {
        newState.batsmen = newState.batsmen.map(b => ({
          ...b,
          onStrike: !b.onStrike
        }));
      }

      // Add to ball-by-ball record
      newState.ballByBall.unshift({
        over: Math.floor(newState.balls / 6),
        ball: (newState.balls % 6) + 1,
        type,
        runs,
        bowler: currentBowler?.name || '',
        batsman: striker?.name || '',
        totalScore: newState.runs,
        wickets: newState.wickets,
        timestamp: new Date().toISOString()
      });

      // Update current over display
      let deliverySymbol = runs.toString();
      if(type === 'WIDE') deliverySymbol = 'Wd';
      if(type === 'NO_BALL') deliverySymbol = 'Nb';
      if(type === 'BYE') deliverySymbol = `${runs}b`;
      if(type === 'LEG_BYE') deliverySymbol = `${runs}lb`;
      
      newState.currentOver = [...newState.currentOver, deliverySymbol];
      if(newState.currentOver.length === 6) {
        newState.currentOver = [];
      }

      return newState;
    });
  };

  const addWicket = (type) => {
    setInnings(prev => {
      const newState = { ...prev };
      const striker = prev.batsmen.find(b => b.onStrike);
      const currentBowler = prev.bowlers.find(b => b.currentBowler);

      // Can't be out on a free hit except run out
      if(prev.isFreeHit && type !== 'Run Out') return prev;

      // Can't be bowled/lbw/caught on a wide
      if(prev.lastDeliveryType === 'WIDE' && 
         ['Bowled', 'LBW', 'Caught', 'Caught & Bowled'].includes(type)) {
        return prev;
      }

      if(striker) {
        striker.status = `Out ${type}`;
        if(fielder && type !== 'Bowled' && type !== 'LBW') {
          striker.status += ` c ${fielder}`;
        }
        if(currentBowler && type !== 'Run Out') {
          currentBowler.wickets++;
        }
      }

      newState.wickets++;
      newState.isFreeHit = false;

      // Add new partnership
      const currentPartnership = newState.partnerships[newState.partnerships.length - 1];
      currentPartnership.batsmen = [
        striker?.name || '',
        newState.batsmen.find(b => !b.onStrike)?.name || ''
      ];
      newState.partnerships.push({
        runs: 0,
        balls: 0,
        batsmen: []
      });

      return newState;
    });
  };

  const handleWicket = (type) => {
    const striker = innings.batsmen.find(b => b.onStrike);
    setWicketModal({
      isOpen: true,
      type,
      fielder: '',
      newBatsman: '',
      outBatsman: striker
    });
  };

  const processWicket = () => {
    setInnings(prev => {
      const newState = { ...prev };
      const currentBowler = prev.bowlers.find(b => b.currentBowler);
      
      // Can't be out on a free hit except run out
      if (prev.isFreeHit && wicketModal.type !== 'Run Out') {
        return prev;
      }

      // Update wicket count
      newState.wickets++;

      // Update bowler stats if applicable
      if (currentBowler && wicketModal.type !== 'Run Out') {
        currentBowler.wickets++;
      }

      // Record fall of wicket
      newState.fallOfWickets.push({
        score: newState.runs,
        wickets: newState.wickets,
        overs: Math.floor(newState.balls / 6),
        balls: newState.balls % 6,
        batsman: wicketModal.outBatsman.name,
        dismissalType: wicketModal.type,
        fielder: wicketModal.fielder,
        bowler: currentBowler?.name
      });

      // Add new batsman
      const newBatsmanId = Math.max(...prev.batsmen.map(b => b.id)) + 1;
      newState.batsmen = newState.batsmen.map(b => 
        b.id === wicketModal.outBatsman.id
          ? { 
              id: newBatsmanId,
              name: wicketModal.newBatsman,
              runs: 0,
              balls: 0,
              fours: 0,
              sixes: 0,
              status: 'Not Out',
              onStrike: true 
            }
          : { ...b, onStrike: false }
      );

      // Update partnership
      const currentPartnership = newState.partnerships[newState.partnerships.length - 1];
      currentPartnership.batsmen = [
        wicketModal.outBatsman.name,
        newState.batsmen.find(b => !b.onStrike)?.name || ''
      ];
      newState.partnerships.push({
        runs: 0,
        balls: 0,
        batsmen: []
      });

      return newState;
    });

    setWicketModal(prev => ({ ...prev, isOpen: false }));
    addBallToOver('W');
  };

  const addBallToOver = (symbol) => {
    setInnings(prev => {
      const newState = { ...prev };
      newState.currentOver = [...prev.currentOver, symbol];
      
      // Check if over is complete
      if (newState.currentOver.length === 6) {
        // Change bowling ends
        newState.batsmen = newState.batsmen.map(b => ({
          ...b,
          onStrike: !b.onStrike
        }));
        
        // Reset current over
        newState.currentOver = [];
        
        // Check for power play
        if (newState.balls === powerPlayOvers.end * 6) {
          newState.isPowerPlay = false;
        }
      }

      return newState;
    });
  };

  // Add DLS adjustment function
  const adjustForDLS = (reduction) => {
    if (matchType !== 'TEST') {
      setDls({
        isActive: true,
        targetScore: calculateDLSTarget(innings.runs, reduction),
        revisedOvers: maxOvers - reduction
      });
    }
  };

  // Function to calculate DLS target (simplified version)
  const calculateDLSTarget = (currentScore, oversReduction) => {
    // This is a simplified calculation - in reality, DLS uses complex tables
    const resourcePercentage = (maxOvers - oversReduction) / maxOvers;
    return Math.ceil(currentScore * resourcePercentage) + 1;
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardContent>
        <div className="space-y-6">
          {/* Score Summary */}
          <div className="flex space-x-4 text-2xl font-bold">
            <div>
              {innings.runs}/{innings.wickets}
            </div>
            <div>
              Overs: {Math.floor(innings.balls/6)}.{innings.balls%6}
            </div>
            {innings.isFreeHit && (
              <div className="text-red-500">Free Hit</div>
            )}
          </div>

          {/* Delivery Controls */}
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-4 font-bold">Regular Runs</div>
            {[0,1,2,3,4,6].map(runs => (
              <Button
                key={runs}
                variant="outline"
                onClick={() => addDelivery('REGULAR', runs)}
              >
                {runs}
              </Button>
            ))}

            <div className="col-span-4 font-bold mt-4">Extras</div>
            <Button variant="outline" onClick={() => addDelivery('WIDE', 0)}>Wide</Button>
            <Button variant="outline" onClick={() => addDelivery('NO_BALL', 0)}>No Ball</Button>
            <Button variant="outline" onClick={() => addDelivery('BYE', 1)}>Bye</Button>
            <Button variant="outline" onClick={() => addDelivery('LEG_BYE', 1)}>Leg Bye</Button>

            <div className="col-span-4 font-bold mt-4">Wickets</div>
            {DISMISSAL_TYPES.map(type => (
              <Button
                key={type}
                variant="outline"
                onClick={() => {
                  setDismissalType(type);
                  setIsWicketModalOpen(true);
                }}
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Current Over */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold">This Over:</span>
            <div className="flex space-x-2">
              {innings.currentOver.map((ball, index) => (
                <div key={index} 
                     className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                  {ball}
                </div>
              ))}
            </div>
          </div>

          {/* Ball by Ball Commentary */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Ball by Ball</h3>
            <div className="h-48 overflow-y-auto border rounded p-2">
              {innings.ballByBall.map((ball, index) => (
                <div key={index} className="border-b py-1">
                  {`${ball.over}.${ball.ball} ${ball.bowler} to ${ball.batsman}: 
                    ${ball.type} ${ball.runs} runs - ${ball.totalScore}/${ball.wickets}`}
                </div>
              ))}
            </div>
          </div>

          {/* ... existing batting and bowling tables ... */}
        </div>
      </CardContent>
      <CardContent>
        <div className="space-y-6">
          {/* Match Settings */}
          <div className="flex space-x-4">
            <select
              value={matchType}
              onChange={(e) => setMatchType(e.target.value)}
              className="border rounded p-2"
            >
              <option value="ODI">ODI</option>
              <option value="T20">T20</option>
              <option value="TEST">Test Match</option>
            </select>
            <div className="text-sm">
              {innings.isPowerPlay && "Power Play in progress"}
            </div>
            {dls.isActive && (
              <div className="text-sm">
                DLS Target: {dls.targetScore} in {dls.revisedOvers} overs
              </div>
            )}
          </div>

          {/* ... existing score summary code ... */}

          {/* Wicket Dialog */}
          <Dialog open={wicketModal.isOpen} onOpenChange={(open) => setWicketModal(prev => ({ ...prev, isOpen: open }))}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Wicket Details - {wicketModal.type}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex flex-col space-y-2">
                  <label>Out: {wicketModal.outBatsman?.name}</label>
                  {(wicketModal.type === 'Caught' || wicketModal.type === 'Stumped' || wicketModal.type === 'Run Out') && (
                    <Input
                      placeholder="Fielder name"
                      value={wicketModal.fielder}
                      onChange={(e) => setWicketModal(prev => ({ ...prev, fielder: e.target.value }))}
                    />
                  )}
                  <Input
                    placeholder="New batsman name"
                    value={wicketModal.newBatsman}
                    onChange={(e) => setWicketModal(prev => ({ ...prev, newBatsman: e.target.value }))}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={processWicket}>Confirm Wicket</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Fall of Wickets */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Fall of Wickets</h3>
            <div className="overflow-x-auto">
              {innings.fallOfWickets.map((fow, index) => (
                <div key={index} className="text-sm">
                  {`${fow.wickets}-${fow.score} (${fow.batsman}, ${fow.overs}.${fow.balls})`}
                </div>
              ))}
            </div>
          </div>

          {/* ... rest of existing code ... */}
        </div>
      </CardContent>
    </Card>
  );
};

export default CricketScorecard;