class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "TitleScene" });
    this.titleMusic = null;
    this.exploreTween = null;
    this.gamepad = null;
    this.buttons = [];
    this.selectedButton = 0;
    this.stickMoved = false;
    this.buttonPressed = false;
  }

  preload() {
    this.load.image(
      "character1",
      "https://play.rosebud.ai/assets/Designer (18).png?kfId"
    );
  }

  create() {
    this.add.image(400, 400, "character1").setScale(0.8);
    var title = this.add
      .text(200, 300, "", {
        color: "black",
        fontFamily: "Arial",
        fontSize: "60px",
        padding: 0,
      })
      .setStroke("#FFFFFF", 9);

    var startButton = this.add
      .text(300, 480, "Start", {
        color: "white",
        fontFamily: "Arial",
        fontSize: "20px",
        backgroundColor: "rgba(173, 216, 230, 1)",
        padding: { left: 50, right: 50, top: 10, bottom: 10 },
      })
      .setInteractive();

    startButton.on("pointerdown", () => this.scene.start("InstructionScene"));
    startButton.on("pointerover", () =>
      startButton.setBackgroundColor("rgba(173, 216, 230, 1)")
    );
    startButton.on("pointerout", () =>
      startButton.setBackgroundColor("rgba(0,0,0,0.6)")
    );
  }
}

class InstructionScene extends Phaser.Scene {
  constructor() {
    super("InstructionScene");
  }

  preload() {
    this.load.image(
      "character12",
      "https://play.rosebud.ai/assets/Blue Doodle Project Presentation (1).png?Hdsj"
    );
  }

  create() {
    this.add.image(400, 300, "character12").setScale(0.5);
    var title = this.add
      .text(200, 300, "", {
        color: "black",
        fontFamily: "Arial",
        fontSize: "60px",
        padding: 0,
      })
      .setStroke("#FFFFFF", 9);

    var startButton = this.add
      .text(300, 470, "Continue", {
        color: "white",
        fontFamily: "Arial",
        fontSize: "20px",
        backgroundColor: "rgba(60, 178, 199, 1)",
        padding: { left: 25, right: 25, top: 5, bottom: 5 },
      })
      .setInteractive();

    startButton.on("pointerdown", () => this.scene.start("Example"));
    startButton.on("pointerover", () =>
      startButton.setBackgroundColor("rgba(60, 178, 199, 1)")
    );
    startButton.on("pointerout", () =>
      startButton.setBackgroundColor("rgba(0,0,0,0.6)")
    );
  }
}

class Example extends Phaser.Scene {
  constructor() {
    super({ key: "Example" });
    this.cartText = null;
    this.cart = null;
    this.cursors = null;
    this.shelfItems = [];
    this.fallenItems = [];
    this.cartBarrier = null;
    this.cartBarrierTopArray = [];
    this.cartBarrierRight = null;
    this.graphics = null;
    this.cameras = null;
    this.rightBound = null;
    this.fallenItemsPositions = {}; // New object to store fallen item positions
    this.flashingRectangle = null;
    this.flashingRectangleAlpha = 0.5;
    this.flashingRectangleDirection = 1;
    this.score = 0; // Initialize score
    this.scoreText = null; // Initialize score text object
    this.scoreBox = null; // Initialize score box
    this.fallenItemsDropTimes = {}; // New object to store fallen item drop times
    this.instructionsBox = null; // New semi-transparent black box for instructions
    this.instructionsText = null; // New text object for instructions
    this.gameStarted = false; // Flag to track if the game has started
    this.maxDownwardSpeed = 10; // Maximum downward speed for fallen items
    this.energyRemainingText = null; // Initialize energy remaining text object
    this.energyRemainingTimer = null; // Initialize energy remaining timer
    this.energyRemainingDuration = 55; // Initial energy remaining duration in seconds
    this.cartControlInstructionsBox = null; // New semi-transparent black box for cart control instructions
    this.cartControlInstructionsText = null; // New text object for cart control instructions
    this.grizzlyBear = null; // Initialize the grizzly bear sprite
    this.energyRemainingRedTimer = null; // Timer to turn the energy remaining text red
  }

  preload() {
    this.load.image(
      "background",
      "https://play.rosebud.ai/assets/StoreBackground.png?Ixb8"
    );
    this.load.image(
      "shelves",
      "https://play.rosebud.ai/assets/shelves-enhanced (1).png?lvHO"
    );
    this.load.image(
      "cartB",
      "https://play.rosebud.ai/assets/ShoppingCartB.png?ei6Z"
    );
    this.load.image(
      "magazine",
      "https://play.rosebud.ai/assets/download.png?dJgz"
    );
    this.load.image(
      "popcorn",
      "https://play.rosebud.ai/assets/download (1).png?CQ3N"
    );
    this.load.image(
      "cookies",
      "https://play.rosebud.ai/assets/download (4).png?rf9K"
    );
    this.load.image(
      "catLitter",
      "https://play.rosebud.ai/assets/download (3).png?cubA"
    );
    this.load.image(
      "cakeMix",
      "https://play.rosebud.ai/assets/download (3).png?cubA"
    );
    this.load.image("book", "https://play.rosebud.ai/assets/download.png?dJgz");
    this.load.image(
      "biscuitMix",
      "https://play.rosebud.ai/assets/download.png?dJgz"
    );
    this.load.image(
      "detergent",
      "https://play.rosebud.ai/assets/download (4).png?rf9K"
    );
    this.load.image(
      "monkeyCereal",
      "https://play.rosebud.ai/assets/download (4).png?rf9K"
    );
    this.load.image(
      "pizza",
      "https://play.rosebud.ai/assets/download (1).png?CQ3N"
    );
    this.load.image(
      "bathGear",
      "https://play.rosebud.ai/assets/download.png?dJgz"
    );
    this.load.image(
      "toothBrushes",
      "https://play.rosebud.ai/assets/download.png?dJgz"
    );
    this.load.image("cd", "https://play.rosebud.ai/assets/download.png?dJgz");
    this.load.image(
      "game",
      "https://play.rosebud.ai/assets/download (3).png?cubA"
    );
    this.load.image(
      "paint",
      "https://play.rosebud.ai/assets/download (4).png?rf9K"
    );
    this.load.image(
      "storeRight",
      "https://play.rosebud.ai/assets/checkout.png?iM88"
    );
    this.load.image(
      "grizzlyBear",
      "https://play.rosebud.ai/assets/Designer__199_-Photoroom-removebg-preview.png?2ZZQ"
    ); // Load the grizzly bear image
  }

  create() {
    let bg = this.add.image(0, 0, "background");
    bg.setOrigin(0, 0);
    bg.setScale(
      this.game.config.width / bg.width,
      this.game.config.height / bg.height
    );

    let shelves = this.add.image(185, 35, "shelves");
    shelves.setOrigin(0, 0);
    let scaleX = (726 - 185) / shelves.width;
    let scaleY = (530 - 35) / shelves.height;
    shelves.setScale(scaleX, scaleY);

    let storeRight = this.add.image(800, 0, "storeRight");
    storeRight.setOrigin(0, 0);
    let storeRightScaleX = (1600 - 800) / storeRight.width;
    let storeRightScaleY = 600 / storeRight.height;
    storeRight.setScale(storeRightScaleX, storeRightScaleY);

    this.rightBound = 800 + storeRight.displayWidth;

    let cartWidth = 346 - 54;
    let cartHeight = 565 - 319;
    this.cart = this.add.image(54, this.game.config.height, "cartB");
    this.cart.setOrigin(0, 1);
    this.cart.setScale(
      cartWidth / this.cart.width,
      cartHeight / this.cart.height
    );
    this.cart.setDepth(1000);

    // Add the grizzly bear sprite
    const bearHeight = this.cart.displayHeight * 1.5; // Stretch the bear upward
    const bearWidth = (bearHeight / 400) * 275; // Maintain the aspect ratio of the bear image
    this.grizzlyBear = this.add.image(
      this.cart.x - bearWidth + this.cart.displayWidth * 0.9,
      this.cart.y - this.cart.displayHeight / 2,
      "grizzlyBear"
    ); // Position the bear with 10% overlap with the cart
    this.grizzlyBear.setOrigin(0.9, 0.65); // Set the origin to the right edge, center vertically
    this.grizzlyBear.setScale(
      bearWidth / this.grizzlyBear.width,
      bearHeight / this.grizzlyBear.height
    );
    this.grizzlyBear.setDepth(999); // Set the depth lower than the cart

    this.cartBarrier = this.matter.add.rectangle(
      this.cart.x + 44,
      this.cart.y - this.cart.displayHeight + 77,
      1,
      132 + 15,
      { isStatic: true }
    );

    this.createCurvedBarrier();

    this.cartBarrierRight = this.matter.add.rectangle(
      this.cart.x + 283,
      this.cart.y - this.cart.displayHeight + 95,
      1,
      132 - 61,
      { isStatic: true }
    );

    this.cartText = this.add
      .text(10, 30, "", { fontSize: "16px", fill: "#00FF00" })
      .setScrollFactor(1);

    this.cursors = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.Z,
      right: Phaser.Input.Keyboard.KeyCodes.X,
    });

    this.graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0xffffff },
    }); // Change the color to white (invisible)

    this.cameras = this.cameras.main;
    this.cameras.startFollow(this.cart, false, 0.5, 0);
    this.cameras.setBounds(0, 0, this.rightBound, 600);
    this.cameras.setBackgroundColor("#FFFFFF");

    this.createShelfItems();

    // Add the flashing green semi-transparent rectangle
    this.flashingRectangle = this.add.rectangle(
      1440,
      560,
      320,
      80,
      0x00ff00,
      this.flashingRectangleAlpha
    );
    this.time.addEvent({
      delay: 22,
      callback: this.flashRectangle,
      callbackScope: this,
      loop: true,
    });

    // Add semi-transparent black box for score text
    const scoreBoxWidth = this.game.config.width; // Set the width to the full screen width
    const scoreBoxHeight = 40; // Decrease the height to match the score text
    this.scoreBox = this.add
      .rectangle(0, 0, scoreBoxWidth, scoreBoxHeight, 0x000000, 0.5)
      .setOrigin(0, 0)
      .setScrollFactor(1);

    // Add score text at the top left of the screen, following the camera
    this.scoreText = this.add
      .text(20, 15, `SCORE: ${this.score}`, {
        fontSize: "23px",
        fill: "#05D9FF",
      })
      .setOrigin(0, 0)
      .setScrollFactor(1);

    // Add energy remaining text inside the long semi-transparent black box
    this.energyRemainingText = this.add
      .text(475, 15, `Energy Remaining: ${this.energyRemainingDuration}`, {
        fontSize: "23px",
        fill: "#05D9FF",
      })
      .setOrigin(0, 0)
      .setScrollFactor(0); // Set scrollFactor to 0 to keep the text in the same position

    // Add semi-transparent black box for instructions
    const instructionsBoxWidth = this.game.config.width * 0.9; // Increase the width to 90% of the screen width
    const instructionsBoxHeight = this.game.config.height * 0.5; // Increase the height to 50% of the screen height
    this.instructionsBox = this.add
      .rectangle(
        this.game.config.width / 2,
        this.game.config.height / 2,
        instructionsBoxWidth,
        instructionsBoxHeight,
        0x000000,
        0.7
      )
      .setOrigin(0.5, 0.5)
      .setDepth(1001); // Set depth higher than the cart

    // Add instructions text with line spaces between instructions
    const instructionsText = `Assist Lucie in bringing her pottery to the checkout on time\n\nPress ENTER to start.`;
    this.instructionsText = this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2,
        instructionsText,
        {
          fontSize: "32px",
          fill: "#C7F6FF",
          align: "center",
          wordWrap: { width: instructionsBoxWidth * 0.8 },
        }
      )
      .setOrigin(0.5, 0.5)
      .setDepth(1002); // Set depth higher than the instructions box

    // Add semi-transparent black box for cart control instructions (initially not visible)
    const cartControlInstructionsBoxWidth = this.game.config.width * 0.5; // Increase the width to 50% of the screen width
    const cartControlInstructionsBoxHeight = 40; // Set the height to match the cart control instructions text
    this.cartControlInstructionsBox = this.add
      .rectangle(
        this.game.config.width / 2,
        this.game.config.height - 30,
        cartControlInstructionsBoxWidth,
        cartControlInstructionsBoxHeight,
        0x000000,
        0.5
      )
      .setOrigin(0.5, 0.5)
      .setDepth(1003)
      .setVisible(false); // Set depth higher than the instructions box, initially not visible

    // Add cart control instructions text (initially not visible)
    const cartControlInstructionsText = `Z/X Keys = Move cart left/right`;
    this.cartControlInstructionsText = this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height - 30,
        cartControlInstructionsText,
        {
          fontSize: "20px",
          fill: "#FFFFFF",
        }
      )
      .setOrigin(0.5, 0.5)
      .setDepth(1004)
      .setVisible(false); // Set depth higher than the cart control instructions box, initially not visible

    // Disable the context menu on right-click
    this.input.mouse.disableContextMenu();

    // Listen for the ENTER key to start the game
    this.input.keyboard.once("keydown-ENTER", this.startGame, this);
  }

  startGame() {
    this.gameStarted = true;
    this.instructionsBox.destroy();
    this.instructionsText.destroy();

    // Show the cart control instructions box and text
    this.cartControlInstructionsBox.setVisible(true);
    this.cartControlInstructionsText.setVisible(true);

    // Start the energy remaining countdown timer
    this.energyRemainingTimer = this.time.addEvent({
      delay: 1000, // 1 second
      callback: this.updateEnergyRemainingTimer,
      callbackScope: this,
      loop: true,
    });

    // Make all shelf items interactive and allow knocking them off the shelves after the game starts
    this.shelfItems.forEach((item) => {
      item.setInteractive({ useHandCursor: true });
      item.on("pointerdown", this.dropItem.bind(this, item));
    });
  }

  updateEnergyRemainingTimer() {
    this.energyRemainingDuration = Math.max(
      0,
      this.energyRemainingDuration - 1
    );
    this.energyRemainingText.setText(
      `Energy Remaining: ${this.energyRemainingDuration}`
    );

    // Game over condition
    if (this.energyRemainingDuration === 0) {
      this.gameOver();
    }
  }

  gameOver() {
    this.gameStarted = false;

    // Stop the energy remaining timer
    this.energyRemainingTimer.remove();

    // Disable all shelf items
    this.shelfItems.forEach((item) => {
      item.disableInteractive();
    });

    // Show a game over message centered on the camera view
    const gameOverBoxWidth = this.cameras.worldView.width * 0.9;
    const gameOverBoxHeight = this.cameras.worldView.height * 0.6;
    const gameOverBox = this.add
      .rectangle(
        this.cameras.worldView.centerX,
        this.cameras.worldView.centerY,
        gameOverBoxWidth,
        gameOverBoxHeight,
        0x000000,
        0.7
      )
      .setOrigin(0.5, 0.5)
      .setDepth(1001);
    const gameOverText = `Congratulations!! You collected the pottery on time\n\nGo to the next level to discover more about Lucie's life.`;
    this.add
      .text(
        this.cameras.worldView.centerX,
        this.cameras.worldView.centerY - 40,
        gameOverText,
        {
          fontSize: "32px",
          fill: "#C7F6FF",
          align: "center",
          wordWrap: { width: gameOverBoxWidth * 0.8 },
        }
      )
      .setOrigin(0.5, 0.5)
      .setDepth(1002);

    const nextButton = this.add
      .text(
        this.cameras.worldView.centerX,
        this.cameras.worldView.centerY + 150,
        "Next Level",
        {
          fontSize: "24px",
          fill: "#FFFFFF",
          backgroundColor: "#4CAF50",
          padding: { left: 20, right: 20, top: 10, bottom: 10 },
        }
      )
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setDepth(1003);

    nextButton.on("pointerdown", () => {
      this.scene.start("BootScene");
    });

    nextButton.on("pointerover", () => {
      nextButton.setStyle({ backgroundColor: "#45a049" });
    });

    nextButton.on("pointerout", () => {
      nextButton.setStyle({ backgroundColor: "#4CAF50" });
    });

    // Hide the cart control instructions box and text
    this.cartControlInstructionsBox.setVisible(false);
    this.cartControlInstructionsText.setVisible(false);

    console.log("Game Over!");
  }

  createShelfItems() {
    const availableItems = [
      "magazine",
      "popcorn",
      "cookies",
      "catLitter",
      "cakeMix",
      "book",
      "biscuitMix",
      "detergent",
      "monkeyCereal",
      "pizza",
      "bathGear",
      "toothBrushes",
      "cd",
      "game",
      "paint",
    ];

    const shelfPositions = [
      { y: 143, startX: 240, endX: 680 },
      { y: 233, startX: 240, endX: 680 },
      { y: 315, startX: 240, endX: 680 },
    ];

    const itemsPerShelf = 5;
    const spaceBetweenItems = 115;

    const shuffledItems = Phaser.Utils.Array.Shuffle(availableItems);

    shelfPositions.forEach((shelf, shelfIndex) => {
      const shelfWidth = shelf.endX - shelf.startX;
      const itemWidth =
        (shelfWidth - (itemsPerShelf - 1) * spaceBetweenItems) / itemsPerShelf;

      for (let i = 0; i < itemsPerShelf; i++) {
        const x = shelf.startX + i * (itemWidth + spaceBetweenItems);
        const itemKey = shuffledItems[shelfIndex * itemsPerShelf + i];
        const item = this.matter.add.sprite(x, shelf.y, itemKey);
        const monkeyCerealScale = (142 - 80) / item.height;
        item.setScale(monkeyCerealScale * 1.15);
        item.setOrigin(0.5, 0.5);
        item.y -= item.displayHeight / 2;
        item.setStatic(true);
        item.body.isSensor = true;
        item.body.friction = 1; // Increase the friction of the item
        this.shelfItems.push(item);
      }
    });
  }

  createCurvedBarrier() {
    let barrierLength = 283 - 44;
    let segments = 20;
    let segmentLength = barrierLength / segments;

    for (let i = 0; i < segments; i++) {
      let x = this.cart.x + 44 + i * segmentLength;
      let y = this.cart.y - this.cart.displayHeight + 132;
      let angle = Math.sin((i / segments) * Math.PI) * 45;
      let height = 20;

      if (i % 3 === 0) {
        height = 40;
      }

      let barrier = this.matter.add.rectangle(x, y, segmentLength, height, {
        isStatic: true,
        angle: angle,
      });
      this.cartBarrierTopArray.push(barrier);
    }
  }

  dropItem(item) {
    if (this.gameStarted) {
      item.setStatic(false);
      item.body.isSensor = false;
      item.disableInteractive();
      this.fallenItems.push(item);
      this.fallenItemsPositions[item.texture.key] = { x: item.x, y: item.y }; // Store the fallen item position
      this.fallenItemsDropTimes[item.texture.key] = this.time.now; // Store the drop time for the fallen item
      this.bringFallenItemsToTop();
      this.time.delayedCall(
        15000,
        this.respawnItem,
        [item.texture.key, item.x, item.y],
        this
      );
    }
  }

  respawnItem(itemKey, x, y) {
    const item = this.matter.add.sprite(x, y, itemKey);
    const monkeyCerealScale = (142 - 80) / item.height;
    item.setScale(monkeyCerealScale * 1.15);
    item.setOrigin(0.5, 0.5);
    item.setStatic(true);
    item.setInteractive({ useHandCursor: true });
    item.on("pointerdown", this.dropItem.bind(this, item));
    item.body.isSensor = true;
    item.body.friction = 1; // Increase the friction of the item
    this.shelfItems.push(item);
    delete this.fallenItemsPositions[itemKey]; // Remove the item position from the object
    delete this.fallenItemsDropTimes[itemKey]; // Remove the drop time for the respawned item
  }

  bringFallenItemsToTop() {
    this.fallenItems.sort((a, b) => b.y - a.y);
    this.fallenItems.forEach((item, index) => {
      item.setDepth(index + 2);
    });
    this.grizzlyBear.setDepth(1); // Set the grizzly bear depth to 1 (behind the fallen items)
  }

  flashRectangle() {
    this.flashingRectangleAlpha += this.flashingRectangleDirection * 0.05;
    if (this.flashingRectangleAlpha >= 1 || this.flashingRectangleAlpha <= 0) {
      this.flashingRectangleDirection *= -1;
    }
    this.flashingRectangle.setAlpha(this.flashingRectangleAlpha);
  }

  update() {
    if (this.gameStarted) {
      if (this.cameras.worldView) {
        // Update score text and score box position
        this.scoreText.setPosition(
          this.cameras.worldView.x + 20,
          this.cameras.worldView.y + 15
        );
        this.scoreBox.setPosition(
          this.cameras.worldView.x,
          this.cameras.worldView.y
        );

        // Check if at least 85% of the cart is within the green rectangle
        const cartLeftX = this.cart.x;
        const cartRightX = this.cart.x + this.cart.displayWidth;
        const rectLeftX =
          this.flashingRectangle.x - this.flashingRectangle.width / 2;
        const rectRightX =
          this.flashingRectangle.x + this.flashingRectangle.width / 2;
        const cartWidth = cartRightX - cartLeftX;
        const overlapWidth =
          Math.min(cartRightX, rectRightX) - Math.max(cartLeftX, rectLeftX);

        const overlapPercentage = overlapWidth / cartWidth;

        if (overlapPercentage >= 0.85) {
          // Destroy all items in the cart
          const itemsInCart = this.fallenItems.filter((item) => {
            const itemX = item.x;
            return itemX >= rectLeftX && itemX <= rectRightX;
          });

          itemsInCart.forEach((item) => {
            item.destroy();
          });

          this.fallenItems = this.fallenItems.filter(
            (item) => !itemsInCart.includes(item)
          );

          // Give 100 points per item only if energy remaining is greater than 0
          if (this.energyRemainingDuration > 0) {
            this.score += itemsInCart.length * 100;
            this.scoreText.setText(`DIFFICULTY / SCORE: ${this.score}`);
          }

          // Clear the fallenItemsPositions object for the destroyed items
          itemsInCart.forEach((item) => {
            delete this.fallenItemsPositions[item.texture.key];
            delete this.fallenItemsDropTimes[item.texture.key];
          });
        }

        // Destroy items that are fully below the screen
        this.fallenItems.forEach((item) => {
          if (item.y > this.game.config.height) {
            item.destroy();
            delete this.fallenItemsPositions[item.texture.key];
            delete this.fallenItemsDropTimes[item.texture.key];
            this.fallenItems = this.fallenItems.filter(
              (fallenItem) => fallenItem !== item
            );
            // Subtract 3 from the energy remaining duration
            this.energyRemainingDuration = Math.max(
              0,
              this.energyRemainingDuration - 3
            );
            this.energyRemainingText.setText(
              `Energy Remaining: ${this.energyRemainingDuration}`
            );

            // Turn the Energy Remaining text red for one second
            this.energyRemainingText.setStyle({ fill: "#FF0000" }); // Set the text color to red
            if (this.energyRemainingRedTimer) {
              this.energyRemainingRedTimer.remove(); // Remove the previous timer if it exists
            }
            this.energyRemainingRedTimer = this.time.delayedCall(
              1000,
              () => {
                // Set a new timer for one second
                this.energyRemainingText.setStyle({ fill: "#C7F6FF" }); // Reset the text color to green
              },
              null,
              this
            );
          }
        });
      }

      // Restore the original cart speed
      if (
        this.cursors.left.isDown &&
        this.cart.x > -0.5 * this.cart.displayWidth
      ) {
        this.cart.x -= 5; // Restored to the original speed of 5
        this.grizzlyBear.x =
          this.cart.x -
          this.grizzlyBear.displayWidth +
          this.cart.displayWidth * 0.9; // Move the grizzly bear with the cart
        Phaser.Physics.Matter.Matter.Body.setPosition(this.cartBarrier, {
          x: this.cart.x + 44,
          y: this.cart.y - this.cart.displayHeight + 87,
        });
        this.cartBarrierTopArray.forEach((barrier, i) => {
          let x = this.cart.x + 44 + (i * (283 - 44)) / 20;
          let y = this.cart.y - this.cart.displayHeight + 132;
          Phaser.Physics.Matter.Matter.Body.setPosition(barrier, {
            x: x,
            y: y,
          });
        });
        Phaser.Physics.Matter.Matter.Body.setPosition(this.cartBarrierRight, {
          x: this.cart.x + 283,
          y: this.cart.y - this.cart.displayHeight + 95,
        });
        this.cameras.startFollow(this.cart, true, 0.5, 0);

        // Update fallen item positions to move with the cart
        this.fallenItems.forEach((item) => {
          const itemX = item.x - this.cart.x;
          const itemY = item.y;
          const dropTime = this.fallenItemsDropTimes[item.texture.key];
          const timeSinceDropped = this.time.now - dropTime;

          // Allow left/right movement only after 0.33 seconds since dropping
          if (timeSinceDropped >= 333) {
            Phaser.Physics.Matter.Matter.Body.setVelocity(item.body, {
              x: -3,
              y: item.body.velocity.y,
            }); // Reduce the x velocity
            Phaser.Physics.Matter.Matter.Body.setAngularVelocity(
              item.body,
              item.body.angularVelocity
            ); // No damping to angular velocity
            this.applyJitterForce(item, true); // Apply jitter force permanently
            this.applyGravityForce(item); // Apply downward force to counteract excessive vertical jittering
            this.clampDownwardSpeed(item); // Clamp the downward speed of the item
          } else {
            Phaser.Physics.Matter.Matter.Body.setVelocity(item.body, {
              x: 0,
              y: item.body.velocity.y,
            }); // Set x velocity to 0
          }

          Phaser.Physics.Matter.Matter.Body.setPosition(item.body, {
            x: this.cart.x + itemX,
            y: itemY,
          });
        });
      } else if (
        this.cursors.right.isDown &&
        this.cart.x < this.rightBound - this.cart.displayWidth
      ) {
        this.cart.x += 5; // Restored to the original speed of 5
        this.grizzlyBear.x =
          this.cart.x -
          this.grizzlyBear.displayWidth +
          this.cart.displayWidth * 0.9; // Move the grizzly bear with the cart
        Phaser.Physics.Matter.Matter.Body.setPosition(this.cartBarrier, {
          x: this.cart.x + 44,
          y: this.cart.y - this.cart.displayHeight + 87,
        });
        this.cartBarrierTopArray.forEach((barrier, i) => {
          let x = this.cart.x + 44 + (i * (283 - 44)) / 20;
          let y = this.cart.y - this.cart.displayHeight + 132;
          Phaser.Physics.Matter.Matter.Body.setPosition(barrier, {
            x: x,
            y: y,
          });
        });
        Phaser.Physics.Matter.Matter.Body.setPosition(this.cartBarrierRight, {
          x: this.cart.x + 283,
          y: this.cart.y - this.cart.displayHeight + 95,
        });
        this.cameras.startFollow(this.cart, true, 0.5, 0);

        // Update fallen item positions to move with the cart
        this.fallenItems.forEach((item) => {
          const itemX = item.x - this.cart.x;
          const itemY = item.y;
          const dropTime = this.fallenItemsDropTimes[item.texture.key];
          const timeSinceDropped = this.time.now - dropTime;

          // Allow left/right movement only after 0.33 seconds since dropping
          if (timeSinceDropped >= 333) {
            Phaser.Physics.Matter.Matter.Body.setVelocity(item.body, {
              x: 3,
              y: item.body.velocity.y,
            }); // Reduce the x velocity
            Phaser.Physics.Matter.Matter.Body.setAngularVelocity(
              item.body,
              item.body.angularVelocity
            ); // No damping to angular velocity
            this.applyJitterForce(item, true); // Apply jitter force permanently
            this.applyGravityForce(item); // Apply downward force to counteract excessive vertical jittering
            this.clampDownwardSpeed(item); // Clamp the downward speed of the item
          } else {
            Phaser.Physics.Matter.Matter.Body.setVelocity(item.body, {
              x: 0,
              y: item.body.velocity.y,
            }); // Set x velocity to 0
          }

          Phaser.Physics.Matter.Matter.Body.setPosition(item.body, {
            x: this.cart.x + itemX,
            y: itemY,
          });
        });
      } else {
        // Apply jitter force and gravity force to all fallen items when the cart is not moving
        this.fallenItems.forEach((item) => {
          Phaser.Physics.Matter.Matter.Body.setAngularVelocity(
            item.body,
            item.body.angularVelocity
          ); // No damping to angular velocity
          this.applyJitterForce(item, true); // Apply jitter force permanently
          this.applyGravityForce(item); // Apply downward force to counteract excessive vertical jittering
          this.clampDownwardSpeed(item); // Clamp the downward speed of the item
        });
      }

      // Prevent fallen items from moving left/right until 0.33 seconds after dropping
      this.fallenItems.forEach((item) => {
        const itemLeftX = item.x - item.displayWidth / 2;
        const itemRightX = item.x + item.displayWidth / 2;
        const cartLeftX = this.cart.x;
        const cartRightX = this.cart.x + this.cart.displayWidth;
        const dropTime = this.fallenItemsDropTimes[item.texture.key];
        const timeSinceDropped = this.time.now - dropTime;

        if (timeSinceDropped < 333) {
          Phaser.Physics.Matter.Matter.Body.setVelocity(item.body, {
            x: 0,
            y: item.body.velocity.y,
          });
        } else if (itemLeftX < cartLeftX || itemRightX > cartRightX) {
          Phaser.Physics.Matter.Matter.Body.setVelocity(item.body, {
            x: 0,
            y: item.body.velocity.y,
          });
        }
      });
    }
  }

  applyJitterForce(item, allowJittering = true) {
    const jitterFactor = Math.min(this.score / 37500, 0.2); // Normalize the jitter factor between 0 and 0.2
    const randomX = Phaser.Math.Between(-1, 1); // Random value between -1 and 1
    const randomY = Phaser.Math.Between(-0.5, 0.5); // Random value between -0.5 and 0.5 (reduced vertical jittering)

    // Apply a random force to the item based on the jitter factor and score
    const forceX = randomX * jitterFactor;
    const forceY = randomY * jitterFactor;

    if (allowJittering) {
      Phaser.Physics.Matter.Matter.Body.applyForce(
        item.body,
        item.body.position,
        { x: forceX, y: forceY }
      );
    }
  }

  applyGravityForce(item) {
    const gravityFactor = 0.05; // Adjust this value to increase or decrease the downward force
    Phaser.Physics.Matter.Matter.Body.applyForce(
      item.body,
      item.body.position,
      { x: 0, y: gravityFactor }
    );
  }

  clampDownwardSpeed(item) {
    const currentVelocity = item.body.velocity;
    if (currentVelocity.y > this.maxDownwardSpeed) {
      Phaser.Physics.Matter.Matter.Body.setVelocity(item.body, {
        x: currentVelocity.x,
        y: this.maxDownwardSpeed,
      });
    }
  }
}

const CHARACTER_NAME = "Lucie Rie";

// Describe your chatbot here. This defines exactly how it will behave.
const CHARACTER_DESCRIPTION = `
You are Lucie Rie, a renowned Austrian-born British studio potter whose work revolutionized ceramics in the 20th century.

Information about you:

Lucie Rie faced many challenges during her life, including fleeing Austria during World War II, but she transformed her hardships into groundbreaking ceramic art. She is approachable and enjoys sharing stories about her journey, from her early struggles to becoming a celebrated artist.

First Message of Roleplay:

"Welcome. Would you like to hear about my life and how I became a renowned potter? Feel free to ask me anything."

NOTE: 
(Ensure your responses are short so the player can respond. Engage the player by asking questions about Lucie Rie's life after every response.)
`;

// This is the URL of the image for your chatbot's background image.
const BACKGROUND_IMAGE_URL = `https://play.rosebud.ai/assets/pottery-8026823_1280.jpg?5TyQ`;

// This is the URL of the image for your chatbot.
const CHARACTER_IMAGE_URL = `https://play.rosebud.ai/assets/profile-pic (25).png?zEZd`;

// Put URLs of all songs you want to be shuffled in this game's playlist.
const SONG_PLAYLIST_URLS = [`https://play.rosebud.ai/assets/song1.mp3?3YMc`];

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    // Preload audio files
    SONG_PLAYLIST_URLS.forEach((url, index) => {
      this.load.audio(`track_${index}`, url);
    });

    // Preload character image
    this.load.image("characterImage", CHARACTER_IMAGE_URL);

    // Preload background image
    this.load.image("backgroundImage", BACKGROUND_IMAGE_URL);
  }

  create() {
    // Initialize the music manager and other dependencies
    this.game.musicManager = new MusicManager(this.game);
    const musicKeys = SONG_PLAYLIST_URLS.map((_, index) => `track_${index}`);
    this.game.musicManager.setPlaylist(musicKeys);
    this.game.musicManager.playNextTrack();
    this.game.musicManager.shufflePlaylist();
    console.log(this.game.musicManager.playlist);

    // Check for existing save and initialize the game state
    this.checkForExistingSave();

    // Add the background image
    const background = this.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      "backgroundImage"
    );
    background.setScale(0.5); // Adjust the scale as needed

    // Create the character image sprite and decrease its size by 20%
    const characterSprite = this.add.sprite(0, 0, "characterImage");
    characterSprite.setScale(0.8); // Decrease the sprite size by 20%
    characterSprite.setPosition(this.scale.width / 1, this.scale.height / 2);

    // Add the text to the top of the screen
    this.add
      .text(400, 50, "Welcome to Lucie Rie - From Refugee to Renowned Potter", {
        fontSize: "26px",
        color: "#84eab3",
        fontFamily: "Arial",
        backgroundColor: "rgba(0,0,0,0.6)",
      })
      .setOrigin(0.5);

    // Transition to another scene
    this.game.sceneTransitionManager.transitionTo("ChatScene");
  }

  checkForExistingSave() {
    const saveData = localStorage.getItem(PROJECT_NAME);
    if (saveData) {
      console.info("Save detected.");
      this.game.saveData = JSON.parse(saveData);
    } else {
      console.info("No save detected. Initializing new game state.");
      // If no save exists, initialize a new save with default values
      this.game.saveData = {
        chatLog: "",
        characterChatManagerState: null, // Assuming a default empty state is suitable
      };

      // Save the initial state to localStorage
      localStorage.setItem(PROJECT_NAME, JSON.stringify(this.game.saveData));
    }
  }
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;

    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Script loading failed for " + url));

    document.head.appendChild(script);
  });
}

const VERSION_NUMBER = "v1"; // Set the version number here.
const PROJECT_NAME = `${CHARACTER_NAME} AI Character ${VERSION_NUMBER}`;
async function initializeGame() {
  try {
    // Load the external script before initializing the Phaser game
    await loadScript(
      `https://play.rosebud.ai/assets/rosebud_AI_character_template_desktop_library.js.js?BELO`
    );
    console.log("Script loaded successfully");

    const config = {
      type: Phaser.AUTO,
      parent: "renderDiv",
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      width: 800,
      height: 600,
      scene: [TitleScene, InstructionScene, Example, BootScene, ChatScene],
      dom: {
        createContainer: true,
      },
      physics: {
        default: "matter",
        matter: {
          gravity: { y: 1 }, // Reduced the gravity force
          debug: false,
        },
      },
    };

    // Assuming 'game' is declared in a broader scope if you need to reference it elsewhere
    window.game = new Phaser.Game(config);
    window.game.sceneTransitionManager = new SceneTransitionManager(game);
  } catch (error) {
    console.error(
      "Failed to load external script or initialize the Phaser game:",
      error
    );
  }
}

initializeGame();
